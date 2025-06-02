import { useEffect, useState } from "react";

export default function LeaderBoard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const sorted = storedScores.sort((a, b) => a.time - b.time);
    setScores(sorted);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {scores.length === 0 ? (
        <p>No scores yet!</p>
      ) : (
        <ol>
          {scores.map((score, index) => (
            <li key={index}>
              {score.name} — {score.time} seconds
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
