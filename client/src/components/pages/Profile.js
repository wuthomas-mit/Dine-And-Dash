import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";
import { post } from "../../utilities";

import "../../utilities.css";
import "../css/Profile.css";
import "../css/Home.css";

const Profile = ({}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteCountry, setFavoriteCountry] = useState("");

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

    if (userData) {
      setFavoriteCountry(userData.favoriteCountry || "");
    }
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

  const handleCountryChange = (event) => {
    setFavoriteCountry(event.target.value);
  };

  return (
    <div className="profile-container">
      <div className="content-container">
        <div className="avatar-container">
          <div className="avatar"></div>
          <div className="avatar-options">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="button">Switch Avatar</div>
        </div>
        <div className="stats-container">
          <div id="Name">{userData.name}</div>
          <h3 style={{ margin: "0px" }}>
            Favorite country:{" "}
            <input type="text" value={favoriteCountry} onChange={handleCountryChange}></input>{" "}
          </h3>
          <div className="item">Heists Completed: {userData.wins}</div>
          <div className="item">
            Fastest Heist:{" "}
            {`${Math.floor(userData.fastest / 60)
              .toString()
              .padStart(2, "0")}:${(userData.fastest % 60).toString().padStart(2, "0")}`}{" "}
            Slowest Heist:{" "}
            {`${Math.floor(userData.slowest / 60)
              .toString()
              .padStart(2, "0")}:${(userData.slowest % 60).toString().padStart(2, "0")}`}
          </div>
          <div className="item">Conquered Countries: {userData.visited.length}/182</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
