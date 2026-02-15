const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const User = require("./models/user");
const ConnectionRequest = require("./models/connectionRequest");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (origin.startsWith("http://localhost:") || origin.endsWith(".netlify.app")) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
const passport = require("passport");
require("./utils/passport"); // Import passport configuration
app.use(passport.initialize());

const routes = [authRouter, requestRouter, userRouter];
app.use("/", routes);
app.use("/.netlify/functions/api", routes);

app.get('/test', (req, res) => {
    res.send('CodeMate Server is up and running!');
});

app.get("/feed", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50 : limit;
      const skip = (page - 1) * limit;
  
      const connectionRequests = await ConnectionRequest.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      }).select("fromUserId toUserId");
  
      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
      });
  
      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUsersFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
        .select("-password")
        .skip(skip)
        .limit(limit);
  
      res.json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = app;
