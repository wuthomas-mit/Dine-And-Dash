import React, { useState, useEffect } from "react";

const timerContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  position: "fixed",
  left: "50%",
  top: "70px",
  transform: "translate(-50%)",
  width: "180px",
  height: "48px",
  backgroundColor: "#FCF6E7",
  border: "4px solid #DD4F3D",
  borderRadius: "5px",
  zIndex: 10,
};

const timerStyle = {
  // backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: "5px",
  zIndex: 10,
  width: "100px",
  fontSize: "32px",
  fontWeight: 700,
  display: "flex",
  alignItems: "top",
  justifyContent: "center",
  textAlign: "center",
  overflow: "hidden",
};

const buttonStyle = {
  marginLeft: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const endGame = {
  height: "14px",
  width: "14px",
  backgroundColor: "#DD4F3D",
  alignItems: "center",
  justifyContent: "center",
};

function TimerComponent({ onGameEnd, setfinal, setGameEnded }) {
  const [time, setTime] = useState(0);
  // const [isRunning, setIsRunning] = useState(true);

  // useEffect for timer management
  useEffect(() => {
    let timer;
    console.log(onGameEnd);
    if (!onGameEnd) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      console.log("reached", formattedTime, time);
      setfinal(formattedTime);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [onGameEnd, formattedTime]);

  useEffect(() => {
    setfinal(formattedTime);
  }, [time]);

  // const handleStop = () => {
  //   // setGameEnded(true);
  // };

  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <div style={timerContainerStyle}>
      <div style={timerStyle}>{formattedTime}</div>
      {/* <div style={buttonStyle} onClick={handleStop}>
        <div style={endGame} />
      </div> */}
    </div>
  );
}

export default TimerComponent;
