const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: function() { 
        // Debugging: check what fields are present
        console.error(`Validating password for ${this.email}. Google: ${this.googleId}, GitHub: ${this.githubId}, LinkedIn: ${this.linkedinId}`);
        return !this.googleId && !this.githubId && !this.linkedinId; 
      }, 
      validate(value) {
        if (!this.googleId && !this.githubId && !this.linkedinId && !validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    googleId: {
      type: String,
    },
    // GitHub Integration
    githubId: {
      type: String,
    },
    githubUsername: {
      type: String,
    },
    githubProfileUrl: {
      type: String,
    },
    // LinkedIn Integration
    linkedinId: {
      type: String,
    },
    linkedinProfileUrl: {
      type: String,
    },
    // Coding Profiles
    leetcodeProfileUrl: {
      type: String,
    },
    codeforcesProfileUrl: {
      type: String,
    },
    codechefProfileUrl: {
      type: String,
    },
    gfgProfileUrl: {
      type: String,
    },
    tufProfileUrl: {
      type: String,
    },
    isLinkedInVerified: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model("User", userSchema);
