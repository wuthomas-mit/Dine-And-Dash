import React, { useEffect } from "react";
import initializeMap from "./initializeMap";

import "../css/Gameplay.css";
import "../../utilities.css";

const Gameplay = () => {
  useEffect(() => {
    initializeMap();
    // Cleanup function for when the component unmounts
    return () => {
      // Code to clean up the map
    };
  }, []);
  const navBarHeight = "34px";
  return (
    <div
      style={{
        position: "absolute",
        top: "74px",
        width: "100%",
      }}
    >
      <div id="map" style={{ height: "100vh", bottom: "-30px" }}></div>
    </div>
  );
};

export default Gameplay;
