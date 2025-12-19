const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://HRSphere:9PEBE7vsX9JbruG@cluster0.ihcx9ce.mongodb.net/devTinder"
  );
};
    
module.exports = connectDB;
