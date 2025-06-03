import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Timer from "./components/Timer";
import ItemDropDown from "./components/ItemDropDown";
import "../styles/App.css";
import LeaderBoard from "./components/LeaderBoard";
import MatrixCanvas from "./components/MatrixBackground";

export default function App() {
  const [isRunning, setIsRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(null);
  const [itemsFound, setItemsFound] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [foundMessage, setFoundMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  const allItems = ["Blueprint Scroll", "Robot Arm", "Headset", "Noodle Cup"];
  //handle items found
  const handleItemsFound = (item) => {
    setItemsFound((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

  useEffect(() => {
    if (itemsFound.length === allItems.length && isRunning) {
      setIsRunning(false);
    }
  }, [itemsFound, isRunning, allItems.length]);

  // handle end of game enter name and time you found items
  const handleStop = (time) => {
    setFinalTime(time);
    const name = prompt(
      `You found them all in ${time} seconds! Enter your name:`
    );

    if (name) {
      const newScore = { name, time };
      const existingScores =
        JSON.parse(localStorage.getItem("leaderboard")) || [];
      existingScores.push(newScore);

      // Sort scores by time fastest first
      existingScores.sort((a, b) => a.time - b.time);

      // Save top 10 scores
      localStorage.setItem(
        "leaderboard",
        JSON.stringify(existingScores.slice(0, 10))
      );
    }
  };

  return (
    <div className="app-container">
      <LeaderBoard className="leaderboard" />

      <div className="game-area">
        <h1 className="game-title">Find the pieces listed Below</h1>
        <div className="top-bar">
          <ItemDropDown allItems={allItems} itemsFound={itemsFound} />
          <Timer
            isRunning={isRunning}
            onStop={handleStop}
            resetKey={resetKey}
          />
          <button
            className="reset-button"
            onClick={() => {
              setIsRunning(false);
              setFinalTime(null);
              setItemsFound([]);
              setResetKey((prev) => prev + 1);
              setIsRunning(true);
              setFoundMessage("");
              setMessageType("");
            }}
          >
            Reset
          </button>
        </div>
        <GameBoard
          onItemsFound={handleItemsFound}
          itemsFound={itemsFound}
          setFoundMessage={setFoundMessage}
          setMessageType={setMessageType}
        />
        {finalTime !== null && (
          <p className="final-time">
            You Found All Items In: {finalTime} seconds
          </p>
        )}
        {foundMessage && (
          <div className={`popup-message ${messageType}`}>{foundMessage}</div>
        )}
            <div>
      <MatrixCanvas />
    </div>
      </div>
    </div>
  );
}
