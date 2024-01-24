import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import { useLocation } from "react-router-dom";

import "../../utilities.css";
import "../css/Profile.css";
import "../css/Home.css";

const Profile = ({}) => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [favoriteCountry, setFavoriteCountry] = useState("");

  useEffect(() => {
    get(`/api/profile`).then((data) => {
      setUserData(data);
    });
    if (userData) {
      setFavoriteCountry(userData.favoriteCountry || "");
    }
  }, [location]);
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
          <div className="item">
            Wins: {userData.wins} Losses: {userData.losses}
          </div>
          <div className="item">
            Fastest: {userData.fastest} Slowest: {userData.slowest}
          </div>
          <div className="item">Streak: 13 Visited: 22</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
