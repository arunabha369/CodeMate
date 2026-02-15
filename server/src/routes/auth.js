const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const { analyzeGitHubSkills } = require("../utils/socialUtils");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const authRouter = express.Router();

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
    
    // Create a token and send it in cookie so user is logged in immediately
    const token = await jwt.sign({ _id: savedUser._id }, "DEV@Tinder$790", {
      expiresIn: "7d",
    });

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      httpOnly: true, // Prevent XSS
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });

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
       // Create a token and send it in cookie so user is logged in immediately
       const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "7d",
      });
  
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        httpOnly: true, // Prevent XSS
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
      });

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
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
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
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    // Successful authentication, redirect home.
    try {
      const token = await jwt.sign({ _id: req.user._id }, "DEV@Tinder$790", {
        expiresIn: "7d",
      });

      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
      });

      res.redirect("http://localhost:5173/profile"); // Redirect to frontend profile
    } catch (err) {
      res.redirect("/login");
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
    failureRedirect: "/login",
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

      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "7d",
      });

      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
      });

      res.redirect("http://localhost:5173/profile");
    } catch (err) {
      console.error("GitHub Auth Error:", err);
      res.redirect("/login");
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
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const user = req.user;
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "7d",
      });

      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
      });

      res.redirect("http://localhost:5173/profile");
    } catch (err) {
      console.error("LinkedIn Auth Error:", err);
      res.redirect("/login");
    }
  }
);

module.exports = authRouter;
