import React, { useRef, useState } from "react";
import { ModalContainer, Title, Subtitle, Footer } from "./TriviaModal";

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

const Start = ({ startGame, endGame, endTime }) => {
  const buttonsRef = useRef(null);

  const [isModeSelected, setIsModeSelected] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  function handleModes() {
    setIsModeSelected(true);
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
    setDifficulty(difficulty);
    target.style.border = "3px solid #E6907D";
    target.dataset.count = "1";
  }
  function viewStats() {}

  return (
    <div style={ModalBackground}>
      <div style={ModalContainer}>
        {!isModeSelected && !endGame && (
          <>
            <div style={Title}>Game Modes</div>
            <div style={Subtitle}>Length of Game</div>
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
              <button className="button" onClick={handleModes}>
                Set Mode
              </button>
            </div>
          </>
        )}
        {isModeSelected && !endGame && (
          <>
            <div style={Title}>Ready to Play?</div>
            <div style={{ ...Subtitle, width: "80%" }}>
              You will be placed on the map at your start country. <br />
              The goal country is shown in the bottom left corner. <br />
              Travel through countries and answer the trivia to reach your goal in as little time as
              possible!
            </div>
            <div style={Footer}>
              <button className="button" onClick={() => startGame(true)}>
                Start the clock
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
              <button className="button" onClick={viewStats}>
                View Stats
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Start;
