const socketIo = require("socket.io");
const { corsOptions } = require("../config/env");

let io;

const initSocket = (server) => {
  io = socketIo(server, {
    // Same allowed origins as the REST API.
    cors: { ...corsOptions, methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id);

    socket.on("joinChat", ({ userId }) => {
      socket.join(userId);
      console.log(`User ${userId} joined their chat room.`);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      // Emit to receiver
      io.to(receiverId).emit("messageReceived", {
        senderId,
        text,
        timestamp: new Date(),
      });
      // Emit back to sender (optional, for confirmation/optimistic UI usually handles this)
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });

  return io;
};

module.exports = initSocket;
