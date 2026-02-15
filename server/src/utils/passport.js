const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user"); // Adjust the path based on your structure

const GitHubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:7778/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google Strategy Callback: Processing profile...");
          // console.log("Profile ID:", profile.id); // Uncomment for detailed debug

          let user = await User.findOne({ email: profile.emails[0].value });
  
          if (user) {
            console.log("User found. Updating Google ID:", profile.id);
            user.googleId = profile.id; // Link Google ID
            if (!user.photoUrl || user.photoUrl === "https://geographyandyou.com/images/user-profile.png") {
               user.photoUrl = profile.photos[0].value;
            }
            await user.save();
            console.log("User updated successfully.");
            return done(null, user);
          }
  
          console.log("Creating new user with Google ID:", profile.id);
          user = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            photoUrl: profile.photos[0].value,
          });
  
          await user.save();
          console.log("New user created successfully.");
          done(null, user);
        } catch (err) {
          console.error("Error in Google Strategy:", err);
          done(err, null);
        }
      }
    )
  );
} else {
    console.warn("Google Client ID/Secret missing. Google Auth disabled.");
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
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
} else {
    console.warn("GitHub Client ID/Secret missing. GitHub Auth disabled.");
}

// Custom LinkedIn OIDC Strategy
class LinkedInOIDCStrategy extends OAuth2Strategy {
  constructor(options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://www.linkedin.com/oauth/v2/authorization';
    options.tokenURL = options.tokenURL || 'https://www.linkedin.com/oauth/v2/accessToken';
    options.scope = options.scope || ['openid', 'profile', 'email'];
    
    super(options, verify);
    
    this.name = 'linkedin';
    this._userProfileURL = 'https://api.linkedin.com/v2/userinfo';
  }

  userProfile(accessToken, done) {
    this._oauth2.get(this._userProfileURL, accessToken, (err, body, res) => {
      if (err) {
        return done(new Error('Failed to fetch user profile. ' + JSON.stringify(err)));
      }

      try {
        const json = JSON.parse(body);
        
        const profile = {
          provider: 'linkedin',
          id: json.sub,
          displayName: json.name,
          name: {
            givenName: json.given_name,
            familyName: json.family_name,
          },
          emails: [{ value: json.email }],
          photos: json.picture ? [{ value: json.picture }] : [],
          _raw: body,
          _json: json,
        };

        done(null, profile);
      } catch (e) {
        done(e);
      }
    });
  }
}

// LinkedIn Strategy
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  passport.use(
    new LinkedInOIDCStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: process.env.LINKEDIN_CALLBACK_URL || "http://localhost:7778/auth/linkedin/callback",
        scope: ["openid", "profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
           // OIDC profile structure specific handling
           const email = profile.emails[0].value;
           let user = await User.findOne({ email: email });
  
           if (user) {
               user.linkedinId = profile.id;
               user.isLinkedInVerified = true;
               if (!user.photoUrl && profile.photos && profile.photos.length > 0) {
                   user.photoUrl = profile.photos[0].value;
               }
               await user.save();
               return done(null, user);
           }
  
           user = new User({
               firstName: profile.name.givenName,
               lastName: profile.name.familyName,
               email: email,
               linkedinId: profile.id,
               isLinkedInVerified: true,
               photoUrl: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : undefined
           });
           await user.save();
           return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
} else {
    console.warn("LinkedIn Client ID/Secret missing. LinkedIn Auth disabled.");
}

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
