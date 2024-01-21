// Navigation.js
import React from "react";
import { Link } from "react-router-dom";

import "../css/Navigation.css";

const Navigation = () => {
  return (
    <div className="navbar">
      <div className="Home">
        <Link to="/">Home</Link>
      </div>
      <div className="Profile">
        <Link to="/Profile">Profile</Link>
      </div>
      <div className="HowTo">
        <Link to="/HowTo">
          <img src={"../../../dist/question-icon.png"} alt="How To Play" />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
