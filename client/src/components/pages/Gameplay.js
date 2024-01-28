import React, { useEffect, useState } from "react";
import initializeMap from "./utilities/initializeMap.js";
import TimerComponent from "./utilities/Timer.js";
import TriviaModal from "./utilities/TriviaModal.js";
import Start from "./utilities/Start.js";

import "../css/Gameplay.css";
import "../../utilities.css";

const Gameplay = () => {
  // used for displayed game info
  const [startCountry, setStartCountry] = useState(null);
  const [goalCountry, setGoalCountry] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [visited, setVisited] = useState(null);
  // handles Start and Trivia Modals
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [openTrivia, setOpenTrivia] = useState(false);
  const [currentTriviaCountries, setcurrentTriviaCountries] = useState(null);

  // useEffect for map initialization
  useEffect(() => {
    if (isGameStarted) {
      initializeMap(
        setStartCountry,
        setGoalCountry,
        setCurrentCountry,
        setVisited,
        setcurrentTriviaCountries,
        setOpenTrivia
      );
    }
  }, [isGameStarted]);

  return (
    <div className="game-container">
      <div id="map"></div>
      {!isGameStarted && <Start startGame={setIsGameStarted} />}
      {isGameStarted && (
        <>
          <TimerComponent />
          {openTrivia && (
            <TriviaModal closeTrivia={setOpenTrivia} trivia_countries={currentTriviaCountries} />
          )}
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
        </>
      )}
    </div>
  );
};

export default Gameplay;
