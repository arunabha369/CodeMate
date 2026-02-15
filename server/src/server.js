require('dotenv').config();
const connectDB = require("./config/database");
const app = require('./app');

const PORT = 7778;

connectDB()
  .then(() => {
    console.log("Database connection established...");
    const http = require("http");
    const initSocket = require("./utils/socket"); // We'll create this to keep server.js clean

    const server = http.createServer(app);
    initSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
