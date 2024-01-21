// Navigation.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import "../css/Navigation.css";

const GOOGLE_CLIENT_ID = "728466374633-tela4eovuk3jdagsce8gbsk20v6m6f1p.apps.googleusercontent.com";

const Navigation = ({ userId, handleLogin, handleLogout }) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="navbar">
        <div className="Home">
          <Link to="/">Home</Link>
        </div>
        <div className="Right">
          <div className="Profile" onClick={toggleDropdown}>
            <img src={"../../../dist/question-icon.jpeg"} alt="Profile" />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {userId ? (
                  <>
                    <Link to="/profile">Profile</Link>
                    <button
                      onClick={() => {
                        googleLogout();
                        handleLogout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                )}
              </div>
            )}
          </div>
          <div className="HowTo">
            <Link to="/howto">
              <img src={"./small-question-icon.jpeg"} alt="How To Play" className="howToImage" />
            </Link>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Navigation;
