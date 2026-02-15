const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user"); // Adjust the path based on your structure

const GitHubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:7778/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          user.googleId = profile.id; // Link Google ID
          if (!user.photoUrl || user.photoUrl === "https://geographyandyou.com/images/user-profile.png") {
             user.photoUrl = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        user = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          photoUrl: profile.photos[0].value,
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:7778/auth/github/callback",
      scope: ["user:email", "read:user"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Since GitHub emails might be private, handle that logic if needed. 
        // For now assume public email or primary email in profile.emails
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        let user = await User.findOne({
            $or: [{ githubId: profile.id }, { email: email }]
        });

        if (user) {
            user.githubId = profile.id;
            user.githubUsername = profile.username;
            user.githubProfileUrl = profile.profileUrl;
            await user.save();
            return done(null, { user, accessToken }); // Pass accessToken for skill analysis
        }

        // If creating new user via GitHub
        if (!email) {
             return done(new Error("No email found in GitHub profile"), null);
        }

        user = new User({
            firstName: profile.displayName || profile.username,
            email: email,
            githubId: profile.id,
            githubUsername: profile.username,
            githubProfileUrl: profile.profileUrl,
            photoUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined
        });
        await user.save();
        return done(null, { user, accessToken });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// LinkedIn Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID, // LinkedIn uses Client ID
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL || "http://localhost:7778/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
         const email = profile.emails[0].value;
         let user = await User.findOne({ email: email });

         if (user) {
             user.linkedinId = profile.id;
             user.isLinkedInVerified = true;
             // user.linkedinProfileUrl = ... (LinkedIn API is tricky with public URLs on free tier)
             await user.save();
             return done(null, user);
         }

         user = new User({
             firstName: profile.name.givenName,
             lastName: profile.name.familyName,
             email: email,
             linkedinId: profile.id,
             isLinkedInVerified: true,
             photoUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined
         });
         await user.save();
         return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((data, done) => {
    // Handle both user object and {user, accessToken} object
    const user = data.user || data;
    done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
