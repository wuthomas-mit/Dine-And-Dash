import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContainer, Title, Subtitle, Footer } from "./TriviaModal";

import { post } from "../../../utilities";
import "../../../utilities.css";
import "../../css/Home.css";

const ModalBackground = {
  display: "flex",
  position: "absolute",
  zIndex: 15,
  backgroundColor: "rgba(238, 187, 144, 0.5)",
  position: "relative",
  width: "100%",
  height: "100vh",
};

const gameModeGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "auto auto",
  gap: "20px",
  alignItems: "center",
  justifyItems: "center",
  height: "auto",
  margin: "20px 0px",
};

const Start = ({ startGame, setDiff, endGame, endTime, userId, visitedCountries }) => {
  const buttonsRef = useRef(null);
  const navigate = useNavigate();

  const [isModeSelected, setIsModeSelected] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(false);

  function convertTimeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  }
  function handleWin() {
    const finalTime = convertTimeToSeconds(endTime);
    let visited = [...visitedCountries];
    post("/api/recordWin", { finalTime, visited })
      .then((data) => {
        // console.log("Win count updated:", data);
        // Handle the response, update UI, etc.
      })
      .catch((error) => {
        console.error("Error updating win count:", error);
      });
  }

  useEffect(() => {
    if (endGame && userId) {
      handleWin();
    }
  }, [endGame]);

  function handleModes() {
    if (selectedDifficulty) {
      setIsModeSelected(true);
    }
  }

  function setColor(e) {
    const target = e.target;
    const difficulty = target.textContent;

    // Reset styles for all buttons
    const buttons = buttonsRef.current.querySelectorAll(".block-button");
    buttons.forEach((button) => {
      button.style.border = "none";
      button.dataset.count = "0";
    });

    // Set selected mode and apply style to the clicked button
    setSelectedDifficulty(true);
    setDiff(difficulty);
    target.style.border = "3px solid #E6907D";
    target.dataset.count = "1";
  }

  function viewProfile() {
    if (userId) {
      navigate("/profile");
    } else {
      alert("Please log in to view your profile");
    }
  }

  return (
    <div style={ModalBackground}>
      <div style={ModalContainer}>
        {!isModeSelected && !endGame && (
          <>
            <div style={Title}>Heist Difficulty</div>
            <div style={Subtitle}>The greater the risk, the greater the reward.</div>
            <div style={gameModeGrid} ref={buttonsRef}>
              {["Easy", "Medium", "Hard"].map((item, index) => (
                <button
                  className="block-button"
                  style={{ width: "120px" }}
                  key={index}
                  onClick={(e) => setColor(e)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div style={Footer}>
              <button className="button" onClick={handleModes} disabled={!selectedDifficulty}>
                Confirm
              </button>
            </div>
          </>
        )}
        {isModeSelected && !endGame && (
          <>
            <div style={Title}>Mission Loading...</div>
            <div style={{ ...Subtitle, width: "85%" }}>
              Agent, there's no turning back from here. <br />
              You are about to take on the heist of a lifetime. <br />
              If you need to review them, the mission details are in the top right. Travel through
              the countries as fast as you can, and don't look back.
            </div>
            <div style={Footer}>
              <button className="button" onClick={() => startGame(true)}>
                Start Heist
              </button>
            </div>
          </>
        )}
        {endGame && (
          <>
            <div style={Title}>Congrats!</div>
            <div style={Subtitle}>
              You reached your goal country in a time of <br />
              {endTime}. <br />
              You're an expert Dine and Dash-er!
            </div>
            <div style={Footer}>
              <button
                className="button"
                onClick={() => {
                  location.reload();
                }}
              >
                Play Again
              </button>
              <button className="button" onClick={viewProfile}>
                View Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Start;
