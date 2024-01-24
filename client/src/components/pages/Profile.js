import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import { useLocation } from "react-router-dom";

import "../../utilities.css";
import "../css/Profile.css";

const Profile = ({}) => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    get(`/api/profile`).then((data) => {
      console.log("d", data);
      setUserData(data);
    });
  }, [location]);
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
