const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user"); // Adjust the path based on your structure

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:7778/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with the same email
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Update the existing user with Google ID
          user.googleId = profile.id;
          if (!user.photoUrl || user.photoUrl === "https://geographyandyou.com/images/user-profile.png") {
             user.photoUrl = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        // Create a new user
        user = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          photoUrl: profile.photos[0].value,
          // Password is required in schema, so we need to handle this.
          // Since schema validation requires password ONLY if googleId is missing, this should be fine.
          // Wait, user schema says password required only if !googleId. So we don't need to pass it.
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
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
