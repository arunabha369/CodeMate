const mongoose = require("mongoose");
const User = require("../models/user");
const connectDB = require("../config/database");

const checkUser = async () => {
    try {
        await connectDB();
        const email = "arunabhabanerjee369@gmail.com";
        const user = await User.findOne({ email: email });
        if (user) {
            console.log("User found:", user);
        } else {
            console.log("User NOT found with email:", email);
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

checkUser();
