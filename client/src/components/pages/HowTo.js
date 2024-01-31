import React from "react";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";
import "../css/HowTo.css";

const HowTo = ({ userId }) => {
  const navigate = useNavigate();

  const handleGame = () => {
    if (!userId) {
      if (confirm("Play without logging in? You can save your stats if you log in!")) {
        navigate("/gameplay");
      }
      // alert("Play without logging in? Log in if you want to save your stats!");
    } else {
      navigate("/gameplay");
    }
  };
  return (
    <div className="how-to-container">
      <h1 className="title-container">
        <span className="secret-mission-prefix">TOP SECRET</span>
        <span className="main-title">Mission Briefing</span>
        <span className="secret-mission-prefix">TOP SECRET</span>
      </h1>
      <h2>OPERATION DINE AND DASH</h2>

      <p>Agent 69620,</p>
      <p>
        Welcome to the high-stakes world of international food heists. Your mission, should you
        choose to accept it, involves a daring journey across the globe, testing your knowledge and
        strategy under pressure.
      </p>
      <h3>Choose Your Heist's Difficulty</h3>
      <p>
        Select your challenge level - Easy, Medium, or Hard. This will dictate how many countries
        you travel through. Remember, the greater the risk, the greater the reward.
      </p>
      <h3>Initiate the Mission</h3>
      <p>
        Click 'Start Heist' to start the clock. Time is of the essence, Agent. Once the mission
        starts, there's no turning back.
      </p>
      <h3>Your Starting Point</h3>
      <p>
        A world map will appear as your mission begins. You will be placed onto a country of our
        choice.
      </p>
      <h3>Your Final Destination</h3>
      <p>You will be assigned a goal country. Navigate the globe to reach this destination.</p>
      <h3>Move Strategically</h3>
      <p>
        Click on adjacent countries to create your path. The shorter the path, the faster you
        complete the mission. Plan wisely.
      </p>
      <h3>Face the Challenges</h3>
      <p>
        Each new country presents a trivia question. Answer correctly to advance to the next
        country, or else a wrong answer sends you back.
      </p>
      <h3>Target Assigned</h3>
      <p>
        Navigate through countries and overcome the challenges to reach your goal country. The clock
        is ticking, so be swift and smart.
      </p>
      <p>
        Remember, Agent, discretion is paramount. Trust your instincts, and your knowledge. The fate
        of the Trash Pandas rests in your hands.
      </p>
      <h3>Good luck.</h3>
      {/* Add your new button container here */}
      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button className="button" onClick={handleGame}>
          Begin Heist
        </button>
      </div>
    </div>
  );
};

export default HowTo;
