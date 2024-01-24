import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";
import { post } from "../../utilities";

import "../../utilities.css";
import "../css/Profile.css";

const Profile = ({}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    post("/api/updateProfile")
      .then((data) => {
        console.log("updated:", data);
        // Handle the response, update UI, etc.
      })
      .catch((error) => {
        console.error("Error :", error);
      });
    // Define a handler for profile updates
    const handleProfileUpdate = (updatedProfile) => {
      setUserData(updatedProfile);
    };

    // Listen for profile update events from the server
    socket.on("profileUpdated", handleProfileUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("profileUpdated", handleProfileUpdate);
    };
  }, []);
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
      <div>Name: {userData.name}</div>
      <div>Wins: {userData.wins}</div>
      <div>Losses: {userData.losses}</div>
      <div>Fastest: {userData.fastest}</div>
      <div>Slowest: {userData.slowest}</div>
    </div>
  );
};

export default Profile;
