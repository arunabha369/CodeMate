const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const { analyzeGitHubSkills } = require("../utils/socialUtils");
const { setAuthCookie, clearAuthCookie } = require("../utils/authCookie");
const { CLIENT_URL } = require("../config/env");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

const authRouter = express.Router();

// OAuth flows end on the frontend, never on the API's own paths.
const redirectToClient = (res, path) => res.redirect(CLIENT_URL + path);
const oauthFailure = (provider) => `${CLIENT_URL}/login?error=${provider}`;

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      email: emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();

    // Log the user in immediately
    setAuthCookie(res, savedUser._id);

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send("Email ID already exists");
    }
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ email: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    if (!user.password) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      setAuthCookie(res, user._id);
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    console.error("Login Error: ", err.message);
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  clearAuthCookie(res);
  res.send("Logout Successful!!");
});

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: oauthFailure("google"),
    session: false,
  }),
  async (req, res) => {
    try {
      setAuthCookie(res, req.user._id);
      redirectToClient(res, "/profile");
    } catch (err) {
      console.error("Google Auth Error:", err);
      res.redirect(oauthFailure("google"));
    }
  }
);

// GitHub Auth
authRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email", "read:user"] })
);

authRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: oauthFailure("github"),
    session: false,
  }),
  async (req, res) => {
    try {
      const { user, accessToken } = req.user; // Strategy returns { user, accessToken }

      // Analyze skills if accessToken is present
      if (accessToken) {
         const topLanguages = await analyzeGitHubSkills(accessToken);
         if (topLanguages.length > 0) {
            // Merge new skills with existing ones, avoiding duplicates
            const currentSkills = user.skills || [];
            const newSkills = [...new Set([...currentSkills, ...topLanguages])];
            user.skills = newSkills;
            await user.save();
         }
      }

      setAuthCookie(res, user._id);
      redirectToClient(res, "/profile");
    } catch (err) {
      console.error("GitHub Auth Error:", err);
      res.redirect(oauthFailure("github"));
    }
  }
);

// LinkedIn Auth
authRouter.get(
  "/auth/linkedin",
  passport.authenticate("linkedin"),
);

authRouter.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: oauthFailure("linkedin"),
    session: false,
  }),
  async (req, res) => {
    try {
      setAuthCookie(res, req.user._id);
      redirectToClient(res, "/profile");
    } catch (err) {
      console.error("LinkedIn Auth Error:", err);
      res.redirect(oauthFailure("linkedin"));
    }
  }
);

module.exports = authRouter;
