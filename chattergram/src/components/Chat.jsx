import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Chat = ({ currentUser, otherUser, socket }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // User's typed message
  const [messages, setMessages] = useState([]); // Array to store chat messages

  // Room ID (based on the user IDs)
  const roomId = [currentUser, otherUser].sort().join("-");

  useEffect(() => {
    if (!socket) {
      console.warn("socket not found");
      return;
    }

    // Join the room when component mounts
    socket.emit("joinRoom", currentUser, otherUser);

    // Listen for incoming messages
    socket.on("chat-message", (senderId, msg) => {
      console.log("chat-message received on client:", msg);
      setMessages((prevMessages) => [...prevMessages,  { senderId: senderId, text: msg }]);
    });

    // Clean up when the component unmounts
    return () => {
      socket.off("chat-message");
      socket.emit("leaveRoom", currentUser, otherUser);
    };
  }, [currentUser, otherUser]);

  // Handle sending messages
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat-message", message, currentUser, otherUser);
      setMessages((prevMessages) => [...prevMessages, { senderId: currentUser, text: message }]);
      setMessage(""); // Clear message input after sending
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0B1220]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === currentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-xl p-3 text-sm shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${
                  msg.senderId === currentUser ? "bg-[#6366F1] text-white" : "bg-[#0F172A] text-[#E2E8F0]"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-[#1E293B]">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage(); // Allow sending with Enter key
            }}
            placeholder="Type your message..."
            className="flex-1 bg-[#0F172A] text-[#E2E8F0] p-3 rounded-xl placeholder-[#94A3B8] outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
          <button
            onClick={sendMessage}
            className="bg-[#6366F1] text-white p-3 rounded-xl hover:bg-indigo-600 focus:ring-2 focus:ring-[#6366F1]"
          >
            Send
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate("/home")}
        className="fixed bottom-16 right-8 bg-[#6366F1] text-white p-4 rounded-full shadow-lg hover:bg-indigo-600"
      >
        Home
      </button>
    </div>
  );
};

export default Chat;
