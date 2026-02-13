const express = require("express");
const routes = require("./routes/index.js");
const dns = require("dns");
const { ConnectCloadinary } = require("./config/cloudinary.js");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const http = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const cors = require("cors");

const dotenv = require("dotenv");
const { dbConnection } = require("./config/db.js");

dotenv.config();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log("✅ App is running on port", port);
});

app.use("/api", routes);

dbConnection();
ConnectCloadinary();

app.get("/", (req, res) => {
  res.send("<h3>Your server is running </h3>");
});

// Create roomId from user IDs
const createRoomId = (user1, user2) => {
  const sortedUsers = [user1, user2].sort();
  return sortedUsers.join("-"); // Generates roomId like "ankit-vaishali"
};

const userSocketMap = {};
const userLeavedSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle room join
  socket.on("log-in", (user) => {
    userSocketMap[user] = socket.id;
    console.log("log-in ", user);
  });

  socket.on("joinRoom", (user1, user2) => {
    console.log("joning room ", user1, user2);
    const roomId = [user1, user2].sort().join("-"); // Ensure consistent room ID
    socket.join(roomId);
    userSocketMap[user1] = socket.id;
    userLeavedSocketMap[user1] = null;
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("leaveRoom", (user1, user2) => {
    console.log("leaving room ", user1, user2);
    const roomId = [user1, user2].sort().join("-"); // Ensure consistent room ID
    socket.leave(roomId);
    userLeavedSocketMap[user1] = socket.id;
    console.log(`User ${socket.id} leaved room: ${roomId}`);
  });

  // Handle message sending
  socket.on("chat-message", (msg, senderId, receiverId) => {
    const roomId = [senderId, receiverId].sort().join("-"); // Same roomId logic
    console.log("chat-message received:", senderId, msg);

    // Broadcast the message to the room
    socket.to(roomId).emit("chat-message", senderId, msg); // Emit to the room

    console.log(userSocketMap, "userSocketMap");
    console.log(userLeavedSocketMap,"userLeavedSocketMap")
    console.log(io.sockets.adapter.rooms, "rooms");
    if (userLeavedSocketMap[receiverId]) {
      if (userSocketMap[receiverId]) {
        io.to(userSocketMap[receiverId]).emit(
          "chat-notification",
          msg,
          senderId,
        ); // Direct notification to user
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
