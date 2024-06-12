import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const timeLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  };

  return (
    <div className="main">
      <h1>
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        {("0" + ((time / 10) % 100)).slice(-2)}
      </h1>
      <div>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => timeLap()}>Lap</button>
      <button onClick={() => setRunning(false)}>Stop</button>
      <button onClick={() => {
        setTime(0);
        setLaps([]);
      }}>Reset</button>
      </div>
      <div>
        {laps.map((lap, index) => (
          <p key={index}>
            Lap {index + 1}: {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((lap / 1000) % 60)).slice(-2)}.
            {("0" + ((lap / 10) % 100)).slice(-2)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
