import { useState } from "react";
import Marker from "./Marker";
import background from "../assets/background.jpg";
import "../../styles/GameBoard.css";

const itemLocations = {
  "Blueprint Scroll": { x: 19, y: 59.5 },
  "Robot Arm": { x: 75.7, y: 41.3 },
  Headset: { x: 93.4, y: 80.8 },
  "Noodle Cup": { x: 74.2, y: 95.5 },
};

export default function GameBoard({
  onItemsFound,
  itemsFound,
  setFoundMessage,
}) {
  const [markerPos, setMarkerPos] = useState(null);
  const [markerColor, setMarkerColor] = useState("red");

const handleClick = (e) => {
  const rect = e.target.getBoundingClientRect();
  const relX = ((e.clientX - rect.left) / rect.width) * 100;
  const relY = ((e.clientY - rect.top) / rect.height) * 100;

  let found = false;

  for (const [item, coords] of Object.entries(itemLocations)) {
    const dx = relX - coords.x;
    const dy = relY - coords.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= 3 && !itemsFound.includes(item)) { // 3% tolerance
      onItemsFound(item);
      setFoundMessage(`You found ${item}!`);
      setMarkerColor("green");
      found = true;
      break;
    }
  }

  if (!found) {
    setFoundMessage("Try again!");
    setMarkerColor("red");
  }

  setMarkerPos({ x: relX, y: relY });

  setTimeout(() => {
    setFoundMessage("");
    setMarkerPos(null);
  }, 2000);
};


  return (
    <div className="game-board">
      <img
        src={background}
        alt="Game"
        onClick={handleClick}
        className="game-image"
      />
      {markerPos && (
        <Marker x={markerPos.x} y={markerPos.y} color={markerColor} />
      )}
    </div>
  );
}
