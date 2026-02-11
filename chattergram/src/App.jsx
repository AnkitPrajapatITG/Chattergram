import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router";
import { io } from "socket.io-client";
import { useEffect } from "react";
import socket from "./services/socket"; // Import the socket instance
import Chat from "./components/Chat";

function App() {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("USER")
      ? JSON.parse(localStorage.getItem("USER"))
      : null,
  );

  useEffect(() => {
    if (!socket) {
      console.warn("socket not found");
      return;
    }

    // Listen for notifications (for when the user is offline)
    socket.on("chat-notification", (msg) => {
      console.log("Received notification:", msg); // Debug log
      alert(`New message from ${otherUser}: ${msg}`);
    });

    // Clean up when the component unmounts
    return () => {
      socket.off("chat-notification");
    };
  }, []);
  return (
    <>
      {/* <button onClick={() => setLogin(prev => !prev)}>login</button> */}
      {/* {
      login ? <Login></Login> : <Signup></Signup>
    } */}
      {/* <Dashboard></Dashboard> */}
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Dashboard {...{ user }} />} />
        <Route
          path="/chat1"
          element={<Chat currentUser={"ankit"} otherUser={"vaishali"} />}
        ></Route>
        <Route
          path="/chat2"
          element={<Chat currentUser={"vaishali"} otherUser={"ankit"} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
