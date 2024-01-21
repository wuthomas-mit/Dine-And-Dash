import React from "react";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";

const HowTo = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="flex-container">
      {
        <div className="buttons-container">
          <button onClick={handleHome}>Home</button>
        </div>
      }
      <img src={"../../../dist/full_globe.jpeg"} />
    </div>
  );
};

export default HowTo;
