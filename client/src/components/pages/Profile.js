import React from "react";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";

const Profile = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="flex-container">
      {
        <div className="buttons-container">
          <button onClick={handleHome}>Home</button>
        </div>
      }
    </div>
  );
};

export default Profile;
