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
      <div className="Right">
        <div className="HowTo">
          <Link to="/howto">
            <img src={"../../../dist/question-icon.jpeg"} alt="How To Play" />
          </Link>
        </div>
        <div className="Profile">
          <Link to="/profile">
            <img src={"../../../dist/question-icon.jpeg"} alt="Profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
