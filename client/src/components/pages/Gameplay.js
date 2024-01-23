import React, { useEffect, useState } from "react";
import initializeMap from "./utilities/initializeMap.js";
import TimerComponent from "./utilities/Timer.js";

import "../css/Gameplay.css";
import "../../utilities.css";
import TriviaModal from "./utilities/TriviaModal.js";

const Gameplay = () => {
  // useEffect for map initialization
  useEffect(() => {
    initializeMap();
  }, []);

  const [openTrivia, setOpenTrivia] = useState(false);

  return (
    <div className="game-container">
      <div id="map"></div>
      <TimerComponent />
      <button
        id="trivia"
        onClick={() => {
          setOpenTrivia(true);
        }}
      >
        Open Trivia
      </button>
      {openTrivia && <TriviaModal closeTrivia={setOpenTrivia} />}
      {openTrivia && <TriviaModal />}
      <div className="game-info-container">
        <div className="game-info">
          <div className="text">Start:</div>
          <div className="text">Goal:</div>
        </div>
        <div className="game-info">
          <div className="text">Current:</div>
          <div className="text">Visited:</div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
