import React, { useEffect, useState } from "react";
import initializeMap from "./initializeMap";

import "../css/Gameplay.css";
import "../../utilities.css";

const Gameplay = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // useEffect for map initialization
  useEffect(() => {
    initializeMap();
  }, []);

  // useEffect for timer management
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <div className="game-container">
      <div id="map"></div>
      <div className="timer-container">
        <div className="timer">{formattedTime}</div>
        <div className="buttons" onClick={handlePlayPause}>
          {isRunning ? "||" : ">"}
        </div>
        <div className="buttons" onClick={handleStop}>
          []
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
