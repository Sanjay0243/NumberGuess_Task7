import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [target, setTarget] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("Make your first guess!");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const maxAttempts = 5;

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; 
  }

  const handleGuess = () => {
    if (gameOver) {
      setFeedback("The game is over. Please reset to play again.");
      return;
    }

    const numGuess = parseInt(guess, 10);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setFeedback("Please enter a valid number between 1 and 100.");
      return;
    }

    setAttempts(attempts + 1);

    if (numGuess === target) {
      setFeedback(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    } else if (attempts + 1 === maxAttempts) {
      setFeedback(`😢 Game over! The number was ${target}.`);
      setGameOver(true);
    } else if (numGuess < target) {
      setFeedback("📉 Too low! Try again.");
    } else {
      setFeedback("📈 Too high! Try again.");
    }

    setGuess("");
  };

  const handleReset = () => {
    setTarget(generateRandomNumber());
    setGuess("");
    setFeedback("Game reset! Make your first guess.");
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Number Guessing Game</h1>
      <p>Guess the number between 1 and 100! </p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="input-box"
        disabled={gameOver}
      />
      <p>You have {maxAttempts} attempts!</p>
      <button onClick={handleGuess} className="button guess-button" disabled={gameOver}>
        Guess
      </button>
      <button onClick={handleReset} className="button reset-button">
        Reset
      </button>
      <p className="feedback">{feedback}</p>
      <p className="attempts">Attempts: {attempts}/{maxAttempts}</p>
    </div>
  );
};

export default App;
