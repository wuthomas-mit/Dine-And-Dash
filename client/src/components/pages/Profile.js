import React, { useEffect, useState } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "../css/Profile.css";

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    get(`/api/profile`).then((data) => {
      setUserData(data);
    });
  }, [userId]);

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
