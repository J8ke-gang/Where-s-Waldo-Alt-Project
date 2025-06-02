import { useState } from "react";
import Marker from "./Marker";
import background from "../assets/background.jpg";
import "../../styles/GameBoard.css";

// item locations
const itemLocations = {
  "Blueprint Scroll": { x: 19, y: 59.5 },
  "Robot Arm": { x: 72.7, y: 41.3 },
  Headset: { x: 90.4, y: 79.8 },
  "Noodle Cup": { x: 72.51, y: 93.5 },
};

export default function GameBoard({
  onItemsFound,
  itemsFound,
  setFoundMessage,
  setMessageType,
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
      ///if found message
      if (distance <= 3 && !itemsFound.includes(item)) {
        onItemsFound(item);
        setFoundMessage(`You found ${item}!`);
        setMessageType("success");
        setMarkerColor("green");
        found = true;
        break;
      }
    }

    if (!found) {
      setFoundMessage("Try again!");
      setMessageType("error");
      setMarkerColor("red");
      setMarkerPos({ x: relX, y: relY });

      // Hide incorrect marker after 2 seconds
      setTimeout(() => {
        setFoundMessage("");
        setMarkerPos(null);
        setMessageType("");
      }, 2000);
    }
  };

  return (
    <div className="game-board">
      <img
        src={background}
        alt="Game"
        onClick={handleClick}
        className="game-image"
      />

      {/* green markers for found items */}
      {itemsFound.map((item) => (
        <Marker
          key={item}
          x={itemLocations[item].x}
          y={itemLocations[item].y}
          color="green"
        />
      ))}

      {/* Red marker for missed guess */}
      {markerPos && (
        <Marker x={markerPos.x} y={markerPos.y} color={markerColor} />
      )}
    </div>
  );
}
