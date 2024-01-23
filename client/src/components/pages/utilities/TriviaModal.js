import React from "react";
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

const Grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto auto",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
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
  let countryName = "Hungary";
  const countryFood = {
    Hungary: "Goulash",
    Ethiopia: "Doro wat",
    Luxembourg: "Judd mat gaardebounen hmv,i,jf lkuymdcjmhcj, ",
    Barbados: "Cou cou and flying fish",
  };

  return (
    <div style={ModalBackground}>
      <div style={ModalContainer}>
        <div style={Title}>
          <h1>{countryName}</h1>
        </div>
        <div style={Grid}>
          {Object.keys(countryFood).map((key, index) => (
            <button className="block-button" key={index}>
              <div>{countryFood[key]}</div>
            </button>
          ))}
        </div>
        <div style={Footer}>
          <button className="button">Clear</button>
          <button className="button">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default TriviaModal;
