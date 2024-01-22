import React, { useEffect, useState } from "react";
import initializeMap from "./initializeMap";
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
    </div>
  );
};

export default Gameplay;
