const serverless = require('serverless-http');
const app = require('../src/app');
const connectDB = require('../src/config/database');

// Ensure DB connects
connectDB();

module.exports.handler = serverless(app);
