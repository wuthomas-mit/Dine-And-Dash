// Navigation.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../css/Navigation.css";

const Navigation = ({ userId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
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
        <div className="Profile" onClick={toggleDropdown}>
          <img src={"../../../dist/question-icon.jpeg"} alt="Profile" />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {userId ? (
                <>
                  <Link to="/profile">Profile</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login/Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
