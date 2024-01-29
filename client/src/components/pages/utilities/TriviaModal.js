import React, { useRef, useState, useEffect } from "react";
import "../../css/Home.css";

export const ModalBackground = {};

export const ModalContainer = {
  backgroundColor: "white",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
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

export const Title = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "52px",
  fontSize: "48px",
  fontWeight: 800,
  marginBottom: "10px",
};

export const Subtitle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "auto",
  margin: "10px auto",
  fontSize: "24px",
  fontWeight: 600,
  textAlign: "center",
};

export const Grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto auto",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
  margin: "10px 0px",
};

export const Footer = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  left: "50%",
  bottom: "20px",
  transform: "translate(-50%)",
  gap: "30px",
};

const useResizeFont = (ref, maxFontSize, minFontSize, step) => {
  useEffect(() => {
    const resizeFont = () => {
      const element = ref.current;
      if (element) {
        let fontSize = maxFontSize;
        element.style.fontSize = `${fontSize}px`;

        while (element.scrollHeight > element.offsetHeight && fontSize > minFontSize) {
          fontSize -= step;
          element.style.fontSize = `${fontSize}px`;
        }
      }
    };

    resizeFont();
  }, [ref, maxFontSize, minFontSize, step]);
};

function TriviaModal({ closeTrivia, trivia_countries, wrongAnswer, previousCountry }) {
  const buttonsRef = useRef(null);
  const titleRef = useRef(null);
  useResizeFont(titleRef, 48, 12, 4);

  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [ans, setAns] = useState(false);

  let countryName = trivia_countries[0].Country;
  const selectRandomDish = (dishString) => {
    const dishes = dishString.split(",").map((dish) => dish.trim());
    return dishes[Math.floor(Math.random() * dishes.length)];
  };
  const [shuffledDishes, setShuffledDishes] = useState([]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
  useEffect(() => {
    const countryFood = trivia_countries.map((country, index) => {
      const selectedDish = selectRandomDish(country.Dish);
      // Store the selected dish for the first country
      if (index === 0) {
        setAns(selectedDish);
      }
      return selectedDish;
    });
    setShuffledDishes(shuffle([...countryFood]));
  }, [trivia_countries]);

  function setColor(e) {
    const target = e.target;
    const food = target.textContent;

    // Reset styles for all buttons
    const buttons = buttonsRef.current.querySelectorAll(".block-button");
    buttons.forEach((button) => {
      button.style.border = "none";
      button.dataset.count = "0";
    });

    // Set selected food and apply style to the clicked button
    setSelectedFoods(food);
    target.style.border = "3px solid #24282A";
    target.dataset.count = "1";
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
        const firstCountryDishes = trivia_countries[0].Dish.split(",").map((dish) => dish.trim());
        if (firstCountryDishes.includes(button.textContent)) {
          button.style.border = "3px solid green"; // Correct pairing
          correctAnswerFound = true;
        } else {
          button.style.border = "3px solid red"; // Incorrect pairing
        }
      }
    });
    setIsCorrect(correctAnswerFound);
    if (!correctAnswerFound) {
      wrongAnswer();
    }
    setIsSubmitted(true);
  }

  function showAnswer() {
    if (!revealAnswer) {
      setRevealAnswer(true);
    } else {
      closeTrivia(false);
    }
  }

  function getWikipediaSearchUrl(dish) {
    const formattedDish = encodeURIComponent(dish); // URL encode the dish name
    return `https://en.wikipedia.org/w/index.php?search=${formattedDish}`;
  }
  return (
    <div style={ModalBackground}>
      <div style={ModalContainer}>
        {!revealAnswer && (
          <>
            <div ref={titleRef} style={Title}>
              {countryName}
            </div>
            <div style={Grid} ref={buttonsRef}>
              {shuffledDishes.map((dish, index) => (
                <button
                  className="block-button"
                  style={{ width: "200px" }}
                  key={index}
                  onClick={(e) => setColor(e)}
                >
                  {dish}
                </button>
              ))}
            </div>
          </>
        )}
        {revealAnswer && (
          <>
            <div style={Title}>{isCorrect ? "Correct!" : "Incorrect..."}</div>
            <div style={Subtitle}>One of the most popular dishes in {countryName} is:</div>
            <div style={Title}>{ans}</div>
            <div style={Subtitle}>
              <a href={getWikipediaSearchUrl(ans)} target="_blank" rel="noopener noreferrer">
                Learn more on Wikipedia (Note: Page might not exist)
              </a>
            </div>
            <div style={Subtitle}>
              {isCorrect
                ? "Advance to the next country!"
                : `Return to ${previousCountry.Country} and try again.`}
            </div>
          </>
        )}
        <div style={Footer}>
          {!isSubmitted && (
            <>
              <button className="button" onClick={clearStyles}>
                Clear
              </button>
              <button
                className="button"
                onClick={handleSubmit}
                disabled={selectedFoods.length === 0}
              >
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
