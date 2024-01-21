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
    <div
      style={{
        position: "absolute",
        top: "74px",
        width: "100%",
      }}
    >
      <div id="map" style={{ height: "100vh", bottom: "-30px" }}></div>
      <div className="timer">{formattedTime}</div>
    </div>
  );
};

export default Gameplay;
