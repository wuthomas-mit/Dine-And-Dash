import React, { useEffect, useState } from "react";
import initializeMap from "./utilities/initializeMap";
import TimerComponent from "./utilities/Timer";

import "../css/Gameplay.css";
import "../../utilities.css";

const Gameplay = () => {
  // useEffect for map initialization
  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div className="game-container">
      <div id="map"></div>
      <TimerComponent/>
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
