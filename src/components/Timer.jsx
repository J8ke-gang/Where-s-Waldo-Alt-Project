import { useEffect, useState } from 'react';

export default function Timer({ isRunning, onStop, resetKey }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Reset when resetKey changes
    setSeconds(0);
  }, [resetKey]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning && onStop) {
      onStop(seconds);
    }
  }, [isRunning, seconds, onStop]);

  return <p>Time: {seconds}s</p>;
}
