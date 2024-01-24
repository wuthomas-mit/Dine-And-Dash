import React, { useRef, useState } from "react";
import "../../css/Home.css";

const ModalBackground = {};

const ModalContainer = {
  backgroundColor: "white",
  position: "fixed",
  justifyContent: "center",
  alignItems: "center",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "400px",
  borderRadius: "20px",
  padding: "20px",
  zIndex: 10,
};

const Title = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "48px",
  marginBottom: "28px",
};

const Subtitle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "24px",
  marginBottom: "28px",
  fontSize: "20px",
};

const Grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto auto",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
};

const BlockAnswer = {
  height: "116px",
  width: "240px",
  padding: "5px",
  textAlign: "center",
  alignSelf: "center",
  borderRadius: "10px",
  backgroundColor: "#FCF6E7",
  color: "#24282A",
  fontSize: "24px",
  fontWeight: 600,
};

const Footer = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  left: "50%",
  bottom: "20px",
  transform: "translate(-50%)",
  gap: "30px",
  marginTop: "20px",
};

function TriviaModal({ closeTrivia }) {
  const buttonsRef = useRef(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  let countryName = "Hungary";
  const countryFood = {
    Hungary: "Goulash",
    Ethiopia: "Doro wat",
    Luxembourg: "Judd mat gaardebounen",
    Barbados: "Cou cou and flying fish",
  };

  function setColor(e) {
    var target = e.target,
      food = target.textContent,
      isSelected = target.dataset.count === "1";

    if (isSelected) {
      setSelectedFoods(selectedFoods.filter((item) => item !== food));
      target.style.border = "None";
      target.dataset.count = "0";
    } else {
      setSelectedFoods([...selectedFoods, food]);
      target.style.border = "3px solid #24282A";
      target.dataset.count = "1";
    }
  }

  function clearStyles() {
    const buttons = buttonsRef.current.querySelectorAll(".block-button");
    buttons.forEach((button) => {
      button.style.border = "none"; // Reset styles
      button.dataset.count = "0"; // Reset count
    });
    setSelectedFoods([]); // Clear the selected foods array
    setIsSubmitted(false);
  }

  function handleSubmit() {
    let correctAnswerFound = false;
    const buttons = buttonsRef.current.querySelectorAll(".block-button");
    buttons.forEach((button) => {
      if (selectedFoods.includes(button.textContent)) {
        if (button.textContent === countryFood[countryName]) {
          button.style.border = "3px solid green"; // Correct pairing
          correctAnswerFound = true;
        } else {
          button.style.border = "3px solid red"; // Incorrect pairing
        }
      }
    });
    setIsCorrect(correctAnswerFound);
    setIsSubmitted(true);
  }

  function showAnswer() {
    if (!revealAnswer) {
      setRevealAnswer(true);
    } else {
      closeTrivia(false);
    }
  }

  // function getWikipediaUrl(dish) {
  //   const formattedDish = dish.replace(/\s+/g, '_'); // Replace spaces with underscores
  //   return `https://en.wikipedia.org/wiki/${formattedDish}`;
  // }

  function getWikipediaSearchUrl(dish) {
    const formattedDish = encodeURIComponent(dish); // URL encode the dish name
    return `https://en.wikipedia.org/w/index.php?search=${formattedDish}`;
  }

  return (
    <div style={ModalBackground}>
      <div style={ModalContainer}>
        {!revealAnswer && (
          <>
            <div style={Title}>
              <h1>{countryName}</h1>
            </div>
            <div style={Grid} ref={buttonsRef}>
              {Object.keys(countryFood).map((key, index) => (
                <button className="block-button" key={index} onClick={(e) => setColor(e)}>
                  {countryFood[key]}
                </button>
              ))}
            </div>
          </>
        )}
        {revealAnswer && (
          <>
            <div style={Title}>
              <h1>{isCorrect ? "Correct!" : "Incorrect..."}</h1>
            </div>
            <div style={Subtitle}>
              <h3>The most popular dish in {countryName} is:</h3>
            </div>
            <div style={Title}>
              <h1>{countryFood[countryName]}</h1>
            </div>
            {/* <div style={BlockAnswer}>{countryFood[countryName]}</div> */}
            <div style={Subtitle}>
              {/* <h3>Click here to learn more: <a href={getWikipediaUrl(countryFood[countryName])} target="_blank" rel="noopener noreferrer">Learn more on Wikipedia</a></h3> */}
              <h3>
                <a
                  href={getWikipediaSearchUrl(countryFood[countryName])}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more on Wikipedia (Note: Page might not exist)
                </a>
              </h3>
            </div>
          </>
        )}
        <div style={Footer}>
          {!isSubmitted && (
            <>
              <button className="button" onClick={clearStyles}>
                Clear
              </button>
              <button className="button" onClick={handleSubmit} disabled={selectedFoods.length === 0}>
                Submit
              </button>
            </>
          )}
          {isSubmitted && !revealAnswer && (
            <button className="button" onClick={showAnswer}>
              Next
            </button>
          )}
          {isSubmitted && revealAnswer && (
            <button className="button" onClick={showAnswer}>
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TriviaModal;
