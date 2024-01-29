import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../../utilities";
import { ModalContainer, Title, Subtitle, Footer } from "./TriviaModal";

import "../../../utilities.css";
import "../../css/Home.css";

const ModalBackground = {
  display: "flex",
  // backgroundColor: "rgba(241, 231, 214,0)",
  // height: "1000px",
  // width: "1000px",
  position: "absolute",
  zIndex: 15,
};

const gameModeGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "auto auto",
  gap: "20px",
  alignItems: "center",
  justifyItems: "center",
  height: "auto",
  margin: "28px 0px 20px 0px",
};

const Start = ({ startGame, setDiff }) => {
  const buttonsRef = useRef(null);

  const [isModeSelected, setIsModeSelected] = useState(false);

  // function handleWin() {
  //   post("/api/recordWin")
  //     .then((data) => {
  //       console.log("Win count updated:", data);
  //       // Handle the response, update UI, etc.
  //     })
  //     .catch((error) => {
  //       console.error("Error updating win count:", error);
  //     });
  // }

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
    setDiff(difficulty);
    console.log(difficulty);
    target.style.border = "3px solid #24282A";
    target.dataset.count = "1";
  }

  return (
    // <div className="flex-container">
    //   {
    //     <div className="buttons-container">
    //       <button onClick={handleWin}>Win-Update</button>
    //     </div>
    //   }
    // </div>
    <div style={ModalBackground}>
      <div style={ModalContainer}>
        {!isModeSelected && (
          <>
            <div style={Title}>Game Modes</div>
            <div style={Subtitle}>Game Length</div>
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
        {isModeSelected && (
          <>
            <div style={Title}>Ready to Play?</div>
            <div style={Subtitle}>Start country:</div>
            <div style={Subtitle}>Goal country:</div>
            <div style={{ ...Subtitle, width: "80%" }}>
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
      </div>
    </div>
  );
};

export default Start;
