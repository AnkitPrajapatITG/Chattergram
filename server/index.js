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

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // When user logs in or connects, store their socket ID
//   socket.on("user-logged-in", (userId) => {
//     userSocketMap[userId] = socket.id;
//     console.log(`User ${userId} connected with socket ID: ${socket.id}`);
//   });

//   // When the user sends a message, handle it
//   socket.on("chat-message", async (msg, senderId, receiverId) => {
//     console.log("chat-message recieved",msg,senderId,receiverId);
//     const roomId = createRoomId(senderId, receiverId);
//     socket.to(roomId).emit("chat-message", msg); // Emit message to room

//     // If the receiver is not connected, send notification
//     if (!io.sockets.adapter.rooms.get(roomId)) {
//       if (userSocketMap[receiverId]) {
//         io.to(userSocketMap[receiverId]).emit("chat-notification", msg); // Direct notification to user
//       }
//       // You can also store the message in the database for future retrieval when the user connects
//     }
//   });

//   socket.on("joinRoom", async (user1, user2) => {
//     const roomId = createRoomId(user1, user2);

//     socket.join(roomId);

//     console.log(`User ${socket.id} joined room: ${roomId}`);

//     // Fetch all unread messages for the user
//     // const unreadMessages = await Message.find({
//     //   roomId,
//     //   receiverId: user1,
//     //   readStatus: false,
//     // });

//     // Send unread messages to the user
//     // unreadMessages.forEach((message) => {
//     //   socket.emit("chat-message", message); // Send the message to the user
//     //   message.readStatus = true; // Mark as read
//     //   message.save(); // Update the message as read in the database
//     // });
//   });

//   // Disconnect event
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle room join
  socket.on("joinRoom", (user1, user2) => {
    const roomId = [user1, user2].sort().join("-"); // Ensure consistent room ID
    socket.join(roomId);
    userSocketMap[user1] = socket.id;
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Handle message sending
  socket.on("chat-message", (msg, senderId, receiverId) => {
    const roomId = [senderId, receiverId].sort().join("-"); // Same roomId logic
    console.log("chat-message received:", msg);

    // Broadcast the message to the room
    socket.to(roomId).emit("chat-message", msg); // Emit to the room

    if (!io.sockets.adapter.rooms.get(roomId)) {
      if (userSocketMap[receiverId]) {
        io.to(userSocketMap[receiverId]).emit("chat-notification", msg); // Direct notification to user
      }
      // You can also store the message in the database for future retrieval when the user connects
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
