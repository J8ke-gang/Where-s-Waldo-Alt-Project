import { useEffect, useState } from "react";

export default function LeaderBoard() {
  const [scores, setScores] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("leaderboard");
    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, []); // run once when component loads
  if (!isClient) return null;
  if (scores.length === 0) return <p>No scores yet.</p>;

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {scores.map((entry, index) => (
          <li key={index}>
            <strong>{entry.name}</strong>: {entry.time} seconds
          </li>
        ))}
      </ol>
    </div>
  );
}
