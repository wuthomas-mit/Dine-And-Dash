import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import globe from "../../images/earth-globe-tool.svg";
import agentRaccoon from "../../images/agent-raccoon.png";

import "../../utilities.css";
import "../css/Home.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "728466374633-tela4eovuk3jdagsce8gbsk20v6m6f1p.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navigate = useNavigate();

  const handleGame = () => {
    if (!userId) {
      alert("Play without logging in? Log in if you want to save your stats!");
    }
    navigate("/gameplay");
  };
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="page-container">
        <div className="animation-container">
          <div className="info-container">
            <div className="tab">TOP SECRET</div>
            <div className="tab" style={{ backgroundColor: "#24282a", color: "white" }}>
              MISSION 2024
            </div>
          </div>
          <div className="animation">
            <img src={agentRaccoon} alt="Agent Raccoon" />
          </div>
        </div>
        <div className="text-container">
          <div className="title">Welcome, Agent 69620</div>
          <div className="subtitle">Mission: Dine and Dash.</div>
          <div className="subtitle">Join us in the ultimate heist to capture all the dishes around the world...</div>
          <div className="button-container">
            <button
              className="button"
              onClick={() => {
                navigate("/howto");
              }}
            >
              Details
            </button>
            <button className="button" onClick={handleGame}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

{
  /* <div className="Online">
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
          </div> */
}

export default Home;
