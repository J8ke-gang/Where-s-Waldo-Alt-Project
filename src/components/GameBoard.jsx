import { useState } from "react";
import Marker from "./Marker";
import background from "../assets/background.jpg";
import "../../styles/GameBoard.css";

const itemLocations = {
  "Blueprint Scroll": { x: 190, y: 595 },
  "Robot Arm": { x: 757, y: 413 },
  Headset: { x: 934, y: 808 },
  "Noodle Cup": { x: 742, y: 955 },
};

const tolerance = 30;

export default function GameBoard({
  onItemsFound,
  itemsFound,
  setFoundMessage,
}) {
  const [markerPos, setMarkerPos] = useState(null);
  const [markerColor, setMarkerColor] = useState("red");

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = false;

    for (const [item, coords] of Object.entries(itemLocations)) {
      const dx = x - coords.x;
      const dy = y - coords.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= tolerance && !itemsFound.includes(item)) {
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

    setMarkerPos({ x, y });

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
