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
}

const timerStyle = {
  // backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: "5px",
  zIndex: 10,
  width: "100px",
  fontSize: "32px",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
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

function TimerComponent() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // useEffect for timer management
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <div style={timerContainerStyle}>
      <div style={timerStyle}>{formattedTime}</div>
      <div style={buttonStyle} onClick={handlePlayPause}>
        {isRunning ? "||" : ">"}
      </div>
      <div style={buttonStyle} onClick={handleStop}>[]</div>
    </div>
  );
}

export default TimerComponent;
