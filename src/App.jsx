import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Timer from "./components/Timer";
import ItemDropDown from "./components/ItemDropDown";
import "../styles/App.css";

export default function App() {
  const [isRunning, setIsRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(null);
  const [itemsFound, setItemsFound] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [foundMessage, setFoundMessage] = useState("");

  const allItems = ["Blueprint Scroll", "Robot Arm", "Headset", "Noodle Cup"];

  const handleItemsFound = (item) => {
    setItemsFound((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

  useEffect(() => {
    if (itemsFound.length === allItems.length && isRunning) {
      setIsRunning(false);
    }
  }, [itemsFound, isRunning]);

  const handleStop = (time) => {
    setFinalTime(time);
    const name = prompt(
      `You found them all in ${time} seconds! Enter your name:`
    );

    fetch("/api/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, time }),
    });
  };

  return (
    <div className="app">
      {/* Dropdown and Reset at Top */}
      <div className="top-bar">
        <ItemDropDown allItems={allItems} itemsFound={itemsFound} />

        <button
          onClick={() => {
            setIsRunning(false);
            setFinalTime(null);
            setItemsFound([]);
            setResetKey((prev) => prev + 1);
            setIsRunning(true);
            setFoundMessage("");
          }}
        >
          Reset Timer
        </button>
      </div>

      {/* Floating Found Message */}
      {foundMessage && <div className="popup-message">{foundMessage}</div>}

      {/* Title and Timer */}
      <h1>Find The pieces listed</h1>
      <Timer isRunning={isRunning} onStop={handleStop} resetKey={resetKey} />
      {finalTime !== null && <p>Your final time: {finalTime} seconds</p>}

      {/* Gameboard */}
      <GameBoard
        onItemsFound={handleItemsFound}
        itemsFound={itemsFound}
        setFoundMessage={setFoundMessage}
      />
    </div>
  );
}
