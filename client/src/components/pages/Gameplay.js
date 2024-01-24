import React, { useEffect, useState } from "react";
import initializeMap from "./utilities/initializeMap.js";
import TimerComponent from "./utilities/Timer.js";

import "../css/Gameplay.css";
import "../../utilities.css";
import TriviaModal from "./utilities/TriviaModal.js";

const Gameplay = () => {
  const [startCountry, setStartCountry] = useState(null);
  const [goalCountry, setGoalCountry] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [visited, setVisited] = useState(null);
  const [openTrivia, setOpenTrivia] = useState(false);

  // useEffect for map initialization
  useEffect(() => {
    initializeMap(setStartCountry, setGoalCountry, setCurrentCountry, setVisited);
  }, []);

  return (
    <div className="game-container">
      <div id="map"></div>
      <TimerComponent />
      <button
        className="button"
        id="trivia"
        onClick={() => {
          setOpenTrivia(true);
        }}
      >
        Open Trivia
      </button>
      {openTrivia && <TriviaModal closeTrivia={setOpenTrivia} />}
      <div className="game-info-container">
        <div className="game-info">
          <div className="text">Start: {startCountry}</div>
          <div className="text">Goal: {goalCountry}</div>
        </div>
        <div className="game-info">
          <div className="text">Current: {currentCountry}</div>
          <div className="text">Visited: {visited ? visited.size : 1}</div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
