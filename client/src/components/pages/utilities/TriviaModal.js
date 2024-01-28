import React, { useRef, useState, useEffect } from "react";
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
  fontSize: "48px",
  fontWeight: 800,
};

const Subtitle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "24px",
  marginBottom: "28px",
  fontSize: "24px",
  fontWeight: 600,
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

function TriviaModal({ closeTrivia, trivia_countries, wrongAnswer }) {
  const buttonsRef = useRef(null);
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
            <div style={Title}>{countryName}</div>
            <div style={Grid} ref={buttonsRef}>
              {shuffledDishes.map((dish, index) => (
                <button className="block-button" key={index} onClick={(e) => setColor(e)}>
                  {dish}
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
              <h3>One of the most popular dishes in {countryName} is:</h3>
            </div>
            <div style={Title}>
              <h1>{ans}</h1>
            </div>
            {/* <div style={BlockAnswer}>{countryFood[countryName]}</div> */}
            <div style={Subtitle}>
              {/* <h3>Click here to learn more: <a href={getWikipediaUrl(countryFood[countryName])} target="_blank" rel="noopener noreferrer">Learn more on Wikipedia</a></h3> */}
              <h3>
                <a href={getWikipediaSearchUrl(ans)} target="_blank" rel="noopener noreferrer">
                  Learn more on Wikipedia (Note: Page might not exist)
                </a>
              </h3>
            </div>
            <div style={Subtitle}>
              {isCorrect
                ? "Advance to the next country!"
                : `Return to ${countryName} and try again.`}
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
