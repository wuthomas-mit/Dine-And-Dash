import React from "react";
import styled from "styled-components";

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
  zIndex: 10,
};

const Title = {
  alignItems: "center",
};

const Grid = {
  display: "grid",
  flexWrap: "wrap",
};

const GridItem = {
  width: "auto",
  height: "36px",
  backgroundColor: "#BBC8BA",
  fontSize: "18px",
  fontWeight: "600",
  textAlign: "center",
  color: "#538786",
  transition: "transform 0.3s, background-color 0.3s, color 0.3s",
};

const GridItemHover = {
  transform: "scale(1.1)",
  backgroundColor: "#538786",
  color: "white",
};

const Footer = {};

function TriviaModal({ closeTrivia }) {
  let countryName = "Hungary";
  const countryFood = {
    // "Hungary": "Goulash",
    // "Ethiopia": "Doro wat",
    // "Luxembourg": "Judd mat gaardebounen",
    // "Equatorial Guinea": "Succotash",
    // "Barbados": "Cou cou and flying fish",
    Hungary: "Goulash",
    Ethiopia: "Doro wat",
    Luxembourg: "Judd mat gaardebounen",
    "Equatorial Guinea": "Succotash",
    Barbados: "Cou cou and flying fish",
  };

  const [hovered, setHovered] = useState(false);
  const buttonStyle = hovered ? { ...buttonStyles, ...buttonHoverStyles } : buttonStyles;

  return (
    <div style={ModalBackground}>
      <div style={ModalContainer}>
        <div style={Title}>
          <h1>{countryName}</h1>
        </div>
        <div style={Grid}>
          {Object.keys(countryFood).map((key, index) => (
            <div
              style={GridItem}
              key={index}
              onMouseEnter={() => this.setState({ hovered: true })}
              onMouseLeave={() => this.setState({ hovered: false })}
            >
              {countryFood[key]}
            </div>
          ))}
        </div>
        <div style={Footer}>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default TriviaModal;
