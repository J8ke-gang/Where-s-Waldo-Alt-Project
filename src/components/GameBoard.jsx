import React from "react";
import background from "../assets/background.jpg";

export default function GameBoard() {
  return (
    <div className="game-board">
      <img src={background} alt="backgroundimg" className="game-image" />
    </div>
  );
}
