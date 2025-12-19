const mongoose = require("mongoose");
const User = require("../models/user");
const connectDB = require("../config/database");
const bcrypt = require("bcrypt");

const createUser = async () => {
    try {
        await connectDB();
        
        const passwordHash = await bcrypt.hash("Aru@#369", 10);
        
        const user = new User({
            firstName: "Arunabha",
            lastName: "Banerjee",
            email: "arunabhabanerjee369@gmail.com",
            password: passwordHash,
            about: "I am the creator of this amazing app!",
            photoUrl: "https://avatars.githubusercontent.com/u/123456?v=4", // Placeholder
            skills: ["MERN", "JavaScript", "React"]
        });

        await user.save();
        console.log("User created successfully!");

    } catch (err) {
        console.error("Creation failed:", err);
    } finally {
        mongoose.connection.close();
    }
};

createUser();
