const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = authRouter;
