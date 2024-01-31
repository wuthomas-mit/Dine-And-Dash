import React, { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navigation from "./pages/Navigation.js";
import Home from "./pages/Home.js";
// import Start from "./pages/utilities/Start.js";
import Profile from "./pages/Profile.js";
import Gameplay from "./pages/Gameplay.js";
import HowTo from "./pages/HowTo.js";
import NotFound from "./pages/NotFound.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });

    // Global WebSocket event listeners
    const handleGlobalEvent = (data) => {
      // Handle global event
      // console.log("Global event data:", data);
      // Update state or perform actions based on event
    };

    socket.on("globalEvent", handleGlobalEvent);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("globalEvent", handleGlobalEvent);
    };
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    // console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };
  return (
    <>
      <Navigation path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                path="/"
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
              />
            }
          />
          {/* <Route path="/start" element={<Start />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/gameplay"
            element={<Gameplay handleLogin={handleLogin} userId={userId} />}
          />
          <Route path="/howto" element={<HowTo userId={userId} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
