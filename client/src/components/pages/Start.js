import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utilities";

import "../../utilities.css";

const Start = () => {
  function handleWin() {
    post("/api/recordWin")
      .then((data) => {
        console.log("Win count updated:", data);
        // Handle the response, update UI, etc.
      })
      .catch((error) => {
        console.error("Error updating win count:", error);
      });
  }

  return (
    <div className="flex-container">
      {
        <div className="buttons-container">
          <button onClick={handleWin}>Win-Update</button>
        </div>
      }
    </div>
  );
};

export default Start;
