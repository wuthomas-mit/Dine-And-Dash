import React, { useEffect, useState } from "react";
import initializeMap from "./utilities/initializeMap.js";
import TimerComponent from "./utilities/Timer.js";

import "../css/Gameplay.css";
import "../../utilities.css";
import TriviaModal from "./utilities/TriviaModal.js";

const Gameplay = () => {
  const [startCountry, setStartCountry] = useState(null);
  const [goalCountry, setGoalCountry] = useState(null);
  const [cCountry, setCurrentCountry] = useState(null);
  const [prevCountry, setPrevCountry] = useState(null);
  const [visited, setVisited] = useState(null);
  const [map, setMap] = useState(null);
  const [openTrivia, setOpenTrivia] = useState(false);
  const [currentTriviaCountries, setcurrentTriviaCountries] = useState(null);

  // useEffect for map initialization
  useEffect(() => {
    const newMap = initializeMap(
      setStartCountry,
      setGoalCountry,
      cCountry,
      setCurrentCountry,
      setVisited,
      setcurrentTriviaCountries,
      setOpenTrivia,
      setPrevCountry
    );
    setMap(newMap);
  }, []);

  const onWrongAnswer = () => {
    console.log(prevCountry);
    if (prevCountry) {
      console.log("reached");
      map.flyTo({ center: [prevCountry.Long, prevCountry.Lat], zoom: 4 });
      map.setFilter("country-clicked", ["==", "ISO_A2", prevCountry.twoCode]);
      setCurrentCountry(prevCountry.Country);
    }
  };

  return (
    <div className="game-container">
      <div id="map"></div>
      <TimerComponent />
      {/* <button
        className="button"
        id="trivia"
        onClick={() => {
          setOpenTrivia(true);
        }}
      >
        Open Trivia
      </button> */}
      {openTrivia && (
        <TriviaModal
          closeTrivia={setOpenTrivia}
          trivia_countries={currentTriviaCountries}
          wrongAnswer={onWrongAnswer}
        />
      )}
      <div className="game-info-container">
        <div className="game-info">
          <div className="text">Start: {startCountry}</div>
          <div className="text">Goal: {goalCountry}</div>
        </div>
        <div className="game-info">
          <div className="text">Current: {cCountry ? cCountry.Country : "Loading..."}</div>
          <div className="text">Visited: {visited ? visited.size : 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
