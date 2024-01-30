// Navigation.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import question from "../../images/howTo.png";
import pfp from "../../images/profilepic.png";

import "../css/Navigation.css";

const GOOGLE_CLIENT_ID = "728466374633-tela4eovuk3jdagsce8gbsk20v6m6f1p.apps.googleusercontent.com";

const Navigation = ({ userId, handleLogin, handleLogout }) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [playOnline, setPlayOnline] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="navbar">
        <div className="Home">
          <Link id="title" to="/">
            Dine and Dash
          </Link>
        </div>
        <div className="Right">
          <div className="User" onClick={toggleDropdown}>
            <img src={pfp} alt="Profile" className="pfp" />
            {(playOnline || isDropdownOpen) && (
              <div className="dropdown-menu">
                {userId ? (
                  <>
                    <Link to="/profile">Profile</Link>
                    <div
                      id="logout"
                      onClick={() => {
                        googleLogout();
                        handleLogout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                )}
              </div>
            )}
          </div>
          <div className="HowTo">
            <Link to="/howto">
              <img src={question} alt="How To Play" className="question" />
            </Link>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Navigation;
