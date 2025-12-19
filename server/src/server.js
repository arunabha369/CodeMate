const connectDB = require("./config/database");
const app = require('./app');
require('dotenv').config();

const PORT = 7778;

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
