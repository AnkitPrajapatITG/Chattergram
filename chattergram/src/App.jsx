import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/userDashboard"
import { Route, Routes } from "react-router";
import { useEffect } from "react";
// import socket from "./services/socket"; // Import the socket instance
import Chat from "./components/Chat";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

function SplitButtons({ closeToast }) {
  return (
    // using a grid with 3 columns
    <div className="grid grid-cols-[1fr_1px_80px] w-full">
      <div className="flex flex-col p-4">
        <h3 className="text-zinc-800 text-sm font-semibold">Email Received</h3>
        <p className="text-sm">You received a new email from somebody</p>
      </div>
      {/* that's the vertical line which separate the text and the buttons*/}
      <div className="bg-zinc-900/20 h-full" />
      <div className="grid grid-rows-[1fr_1px_1fr] h-full">
        {/*specifying a custom closure reason that can be used with the onClose callback*/}
        <button onClick={() => closeToast("reply")} className="text-purple-600">
          Reply
        </button>
        <div className="bg-zinc-900/20 w-full" />
        {/*specifying a custom closure reason that can be used with the onClose callback*/}
        <button onClick={() => closeToast("ignore")}>Ignore</button>
      </div>
    </div>
  );
}
function App() {
  const [login, setLogin] = useState(true);
  const [socketState, setSocketState] = useState();
  const [user, setUser] = useState(
    localStorage.getItem("USER")
      ? JSON.parse(localStorage.getItem("USER"))
      : null,
  );

    const notify = () => {
    toast(SplitButtons, {
      closeButton: false,
      // remove the padding on the toast wrapper
      // make it 400px width
      // add a thin purple border because I like purple
      className: 'p-0 w-[400px] border border-purple-600/40',
      ariaLabel: 'Email received',
    });
  };

  useEffect(() => {
    if(!user) return;
    const socket = io("http://localhost:8080"); // Change to your backend URL
    setSocketState(socket);
    if (!socket) {
      console.warn("socket not found");
      return;
    }

    socket.emit("log-in",user.userName);
    // Listen for notifications (for when the user is offline)
    socket.on("chat-notification", (msg, otherUser) => {
      console.log("Received notification:", msg); // Debug log
      // alert(`New message from ${otherUser}: ${msg}`);
      toast(`New message from ${otherUser}: ${msg}`);
    });

    // Clean up when the component unmounts
    return () => {
      socket.off("chat-notification");
    };
  }, [user]);
  return (
    <>
      {/* <button onClick={() => setLogin(prev => !prev)}>login</button> */}
      {/* {
      login ? <Login></Login> : <Signup></Signup>
    } */}
      {/* <Dashboard></Dashboard> */}
         <div className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-950">
        <h1 className="text-xl font-semibold">
          Social<span className="text-indigo-500">Hub</span>
        </h1>

        {/* User Icon */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 hidden sm:block">
            {user.userName}
          </span>
          <img
            src={user.image ?? "https://i.pravatar.cc/150?img=12"}  
            alt="user"
            className="w-9 h-9 rounded-full border border-slate-800 object-cover"
          />
        </div>
      </div>

      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Dashboard {...{ user }} />} />
        <Route path="/userDashboard" element={<UserDashboard {...{ user }} />} />
        {socketState && (
          <Route
            path="/chat1"
            element={
              <Chat
                currentUser={"ankit_kumar"}
                otherUser={"vaishali_verma"}
                socket={socketState}
              />
            }
          ></Route>
        )}
        {socketState && (
          <Route
            path="/chat2"
            element={
              <Chat
                currentUser={"vaishali_verma"}
                otherUser={"ankit_kumar"}
                socket={socketState}
              />
            }
          ></Route>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
