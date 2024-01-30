import React, { useState, useEffect } from "react";
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
      if (confirm("Play without logging in? You can save your stats if you log in!")) {
        navigate("/gameplay");
      }
      // alert("Play without logging in? Log in if you want to save your stats!");
    } else {
      navigate("/gameplay");
    }
  };

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentSubtitle1Index, setCurrentSubtitle1Index] = useState(0);
  const [currentSubtitle2Index, setCurrentSubtitle2Index] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle1, setShowSubtitle1] = useState(false);
  const [showSubtitle2, setShowSubtitle2] = useState(false);
  const titleCharacters = "Welcome, Agent 69620".split("");
  const subtitle1Characters = "Mission: Dine and Dash.".split("");
  const subtitle2Characters =
    "Join us in the ultimate heist to capture all the dishes around the world...".split("");

  useEffect(() => {
    // Start rendering the title after an initial pause
    setTimeout(() => {
      setShowTitle(true);
      startTitleTimer();
    }, 1000);
  }, []);

  // Function to start the title timer
  const startTitleTimer = () => {
    setShowTitle(true);
    const titleTimer = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => {
        if (prevIndex < titleCharacters.length) {
          return prevIndex + 1;
        } else {
          clearInterval(titleTimer);
          startSubtitle1Timer(); // Start the first subtitle after the title is complete
          return prevIndex;
        }
      });
    }, 300);
    return () => clearInterval(titleTimer);
  };

  // Function to start the first subtitle timer
  const startSubtitle1Timer = () => {
    setTimeout(() => {
      setShowSubtitle1(true);
      const subtitle1Timer = setInterval(() => {
        setCurrentSubtitle1Index((prevIndex) => {
          if (prevIndex < subtitle1Characters.length) {
            return prevIndex + 1;
          } else {
            clearInterval(subtitle1Timer);
            startSubtitle2Timer(); // Start the second subtitle after the first subtitle is complete
            return prevIndex;
          }
        });
      }, 600);
    }, 2000);
  };

  // Function to start the second subtitle timer
  const startSubtitle2Timer = () => {
    setTimeout(() => {
      setShowSubtitle2(true);
      const subtitle2Timer = setInterval(() => {
        setCurrentSubtitle2Index((prevIndex) => {
          if (prevIndex < subtitle2Characters.length) {
            return prevIndex + 1;
          } else {
            clearInterval(subtitle2Timer);
            return prevIndex;
          }
        });
      }, 600);
    }, 2000);
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
          {showTitle && (
            <div className="title">
              {titleCharacters.slice(0, currentTitleIndex).join("")}
              {currentTitleIndex < titleCharacters.length && (
                <span className="blinking-cursor"></span>
              )}
            </div>
          )}
          {showSubtitle1 && (
            <div className="subtitle">
              {subtitle1Characters.slice(0, currentSubtitle1Index).join("")}
              {currentSubtitle1Index < subtitle1Characters.length && (
                <span className="blinking-cursor"></span>
              )}
            </div>
          )}
          {showSubtitle2 && (
            <div className="subtitle">
              {subtitle2Characters.slice(0, currentSubtitle2Index).join("")}
              <span className="blinking-cursor"></span>
            </div>
          )}
          <div className="button-container">
            <button
              className="button"
              onClick={() => {
                navigate("/howto");
              }}
            >
              How To Play
            </button>
            <button className="button" onClick={handleGame}>
              Play Game
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
