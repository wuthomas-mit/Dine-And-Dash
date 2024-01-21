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
      <div className="Start">
        <Link to="/start">Start</Link>
      </div>
    </div>
  );
};

export default Navigation;
