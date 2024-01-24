import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import globe from "../../images/earth-globe-tool.svg";

import "../../utilities.css";
import "../css/Home.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "728466374633-tela4eovuk3jdagsce8gbsk20v6m6f1p.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navigate = useNavigate();
  const handlePlayLocal = () => {
    navigate("/start");
  };
  const handleGame = () => {
    navigate("/gameplay");
  };
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="page-container">
        <div className="title-container">
          <h1 className="Title">Explore the World Through Food!</h1>
        </div>

        <div className="animation-container">
          <img src={globe} alt="globe" />
        </div>
        <div className="button-container">
          <div className="Local">
            <button className="button" onClick={handlePlayLocal}>
              <span>Play Local</span>
            </button>
          </div>
          <div className="Online">
            <button className="button" onClick={toggleDropdown}>
              <span>Play Online</span>
            </button>
            {isDropdownOpen && (
              <div id="play-online-button">
                {userId ? (
                  <>
                    <button className="button"
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
          <div className="game">
            <button className="button" onClick={handleGame}>
              <span>Play Game</span>
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Home;
