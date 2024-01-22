import React, { useEffect, useState } from "react";
import initializeMap from "./initializeMap";

import "../css/Gameplay.css";
import "../../utilities.css";

const Gameplay = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    initializeMap();
    // Cleanup function for when the component unmounts
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <div className="game-container">
      <div id="map"></div>
      <div className="timer-container">
        <div className="timer">{formattedTime}</div>
        <div className="buttons">||</div>
        <div className="buttons">[]</div>
      </div>
    </div>
  );
};

export default Gameplay;
