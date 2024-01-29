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
  const [cCountry, setCCountry] = useState(null);
  const [prevCountry, setPrevCountry] = useState(null);
  const [visited, setVisited] = useState(null);
  // handles Start and Trivia Modals
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [map, setMap] = useState(null);
  const [openTrivia, setOpenTrivia] = useState(false);
  const [currentTriviaCountries, setcurrentTriviaCountries] = useState(null);
  const [updateCurrentFunction, setCurrentCountryCallback] = useState(() => {
    return null;
  });

  // useEffect for map initialization
  useEffect(() => {
    if (isGameStarted) {
      const newMap = initializeMap(
        setStartCountry,
        setGoalCountry,
        cCountry,
        setCCountry,
        setVisited,
        setcurrentTriviaCountries,
        setOpenTrivia,
        setPrevCountry,
        setCurrentCountryCallback,
        difficulty
      );
      setMap(newMap);
    }
  }, [isGameStarted]);

  const onWrongAnswer = () => {
    if (prevCountry) {
      map.flyTo({ center: [prevCountry.Long, prevCountry.Lat], zoom: 4 });
      map.setFilter("country-clicked", ["==", "ISO_A2", prevCountry.twoCode]);
      visited.delete(cCountry.twoCode);
      setCCountry(prevCountry);
      updateCurrentFunction(prevCountry);
    }
  };

  return (
    <div className="game-container">
      <div id="map"></div>
      {!isGameStarted && <Start startGame={setIsGameStarted} setDiff={setDifficulty} />}
      {isGameStarted && (
        <>
          <TimerComponent />
          {openTrivia && (
            <TriviaModal
              closeTrivia={setOpenTrivia}
              trivia_countries={currentTriviaCountries}
              wrongAnswer={onWrongAnswer}
              previousCountry={prevCountry}
            />
          )}
          <div className="game-info-container">
            <div className="game-info">
              <div className="text">Start: {startCountry}</div>
              <div className="text">Goal: {goalCountry}</div>
            </div>
            <div className="game-info">
              <div className="text">Current: {cCountry ? cCountry.Country : "Loading..."}</div>
              <div className="text">Visited: {visited ? visited.size : 1}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gameplay;
