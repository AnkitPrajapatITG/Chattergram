import React, { useState, useEffect } from "react";
import socket from "../services/socket.js";  // Import the socket instance

const Chat = ({ currentUser, otherUser }) => {
  const [message, setMessage] = useState("");  // User's typed message
  const [messages, setMessages] = useState([]);  // Array to store chat messages
  const [isTyping, setIsTyping] = useState(false); // Track typing status

  // Room ID (based on the user IDs)
  const roomId = [currentUser, otherUser].sort().join("-");

  // Handle socket connection and joining the room
  // useEffect(() => {
  //   if(!socket){
  //     console.warn("socket not found");
  //     return;
  //   }
  //   // Join the room on component mount
  //   socket.emit("joinRoom", currentUser, otherUser);

  //   // Listen for incoming messages
  //   socket.on("chat-message", (msg) => {
  //     console.log("chat-message recieved on client",msg);
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   // Listen for notifications (for when the user is offline)
  //   socket.on("chat-notification", (msg) => {
  //     alert(`New message from ${otherUser}: ${msg}`);
  //   });

  //   // Clean up when the component unmounts
  //   return () => {
  //     socket.off("chat-message");
  //     socket.off("chat-notification");
  //   };
  // }, [currentUser, otherUser]);
  useEffect(() => {
  if (!socket) {
    console.warn("socket not found");
    return;
  }

  // Join the room when component mounts
  socket.emit("joinRoom", currentUser, otherUser);

  // Listen for incoming messages
  socket.on("chat-message", (msg) => {
    console.log("chat-message received on client:", msg);  // Debug log
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  // Listen for notifications (for when the user is offline)
  socket.on("chat-notification", (msg) => {
    console.log("Received notification:", msg);  // Debug log
    alert(`New message from ${otherUser}: ${msg}`);
  });

  // Clean up when the component unmounts
  return () => {
    socket.off("chat-message");
    socket.off("chat-notification");
  };
}, [currentUser, otherUser]);


  // Handle sending messages
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat-message", message, currentUser, otherUser);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");  // Clear message input after sending
    }
  };

  // Render the chat UI
  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === currentUser ? "sent" : "received"}`}>
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage(); // Allow sending with Enter key
          }}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
