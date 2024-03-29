import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";
import { post } from "../../utilities";

import "../../utilities.css";
import "../css/Profile.css";
import "../css/Home.css";
import agentRaccoon from "../../images/agent-raccoon.png";
import hungryRacoon from "../../images/hungry-raccoon.png";
import surprisedRacoon from "../../images/surprised-raccoon.png";
import mastermindRaccoon from "../../images/mastermind-raccoon.png";
import travelerRaccoon from "../../images/traveler-raccoon.png";

const Profile = ({}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatars = [
    "agentRaccoon",
    "hungryRacoon",
    "surprisedRacoon",
    "mastermindRaccoon",
    "travelerRaccoon",
  ];
  const avatarsDict = {
    agentRaccoon: agentRaccoon,
    hungryRacoon: hungryRacoon,
    surprisedRacoon: surprisedRacoon,
    mastermindRaccoon: mastermindRaccoon,
    travelerRaccoon: travelerRaccoon,
  };
  const [currentAvatar, setCurrentAvatar] = useState("agentRaccoon");

  useEffect(() => {
    setIsLoading(true);
    post("/api/updateProfile")
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
        if (data && data.currentAvatar) {
          setCurrentAvatar(data.currentAvatar);
        }
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
  function switchAvatar() {
    const currentIndex = avatars.indexOf(currentAvatar);
    const nextIndex = (currentIndex + 1) % avatars.length;
    const nextAvatar = avatars[nextIndex];
    setCurrentAvatar(nextAvatar);

    post("/api/updateAvatar", { nextAvatar })
      .then((data) => {
        // Handle response
      })
      .catch((error) => {
        // console.error("Error updating avatar:", error);
      });
  }

  return (
    <div className="profile-container">
      <div className="content-container">
        <div className="avatar-container">
          <div className="info-container">
            <div className="tab">{userData.currentAvatar}</div>
          </div>
          <div className="avatar">
            <img src={avatarsDict[currentAvatar]} alt="user avatar" />
          </div>
          {/* <div className="avatar-options">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div> */}
          <div className="button" onClick={switchAvatar}>
            Switch Avatar
          </div>
        </div>
        <div className="stats-container">
          <div id="Name">
            Agent 69620 <br /> {userData.name}
          </div>
          <div className="item">Heists Completed: {userData.wins}</div>
          <div className="item">
            Fastest Heist:{" "}
            {`${Math.floor(userData.fastest / 60)
              .toString()
              .padStart(2, "0")}:${(userData.fastest % 60).toString().padStart(2, "0")}`}{" "}
          </div>
          <div className="item">
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
