import React, { useState, useEffect } from 'react';
import './App.css';

const sampleWords = [
  {
    word: "HELLO",
    description: "A common greeting to say hi."
  },
  {
    word: "WORLD",
    description: "The planet we live on, which is full of land and water."
  },
  {
    word: "JAVASCRIPT",
    description: "A popular programming language for building interactive websites."
  },
  {
    word: "REACT",
    description: "A JavaScript library for building single-page applications."
  },
  {
    word: "PROGRAMMING",
    description: "The process of developing code."
  }
];

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * sampleWords.length);
  return sampleWords[randomIndex];
}

const GFGWordGame = () => {
  const [wordData, setWordData] = useState(getRandomWord());
  const [msg, setMsg] = useState("");
  const [chosenLetters, setChosenLetters] = useState([]);
  const [hints, setHints] = useState(3);
  const [displayWord, setDisplayWord] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    if (wrongGuesses >= 3) {
      setMsg("Game Over! You made too many wrong guesses.");
      setDisplayWord(true);
    }
  }, [wrongGuesses]);

  const letterSelectionFunction = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter]);
      if (!wordData.word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const hintFunction = () => {
    if (hints > 0) {
      const hiddenLetterIndex = wordData.word.split("").findIndex((letter) => !chosenLetters.includes(letter));
      if (hiddenLetterIndex !== -1) {
        setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
        setHints(hints - 1);
      }
    }
  };

  const removeCharacterFunction = () => {
    setChosenLetters(chosenLetters.slice(0, -1));
  };

  const displayLettersFunction = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(letters).map((letter, index) => (
      <button
        key={index}
        onClick={() => letterSelectionFunction(letter)}
        disabled={chosenLetters.includes(letter)}
        className={`letter-button ${chosenLetters.includes(letter) ? "selected" : ""}`}
      >
        {letter}
      </button>
    ));
  };

  const checkWordGuessedFunction = () => {
    return wordData.word.split("").every((letter) => chosenLetters.includes(letter));
  };

  const guessFunction = () => {
    if (checkWordGuessedFunction()) {
      setMsg("Bingo! You have guessed the word correctly!");
      setDisplayWord(true);
    } else {
      setMsg("You made a wrong guess. Try again!");
    }
  };

  const restartGameFunction = () => {
    setWordData(getRandomWord());
    setMsg("");
    setChosenLetters([]);
    setHints(3);
    setDisplayWord(false);
    setWrongGuesses(0);
  };

  return (
    <div className="container">
      <div className="word-container">
        {Array.from(wordData.word).map((letter, index) => (
          <div
            key={index}
            className={`letter ${chosenLetters.includes(letter) ? "visible" : ""}`}
          >
            {chosenLetters.includes(letter) ? letter : ""}
          </div>
        ))}
      </div>
      <p className="word-description">Hint: {wordData.description}</p>
      {msg && (
        <div className="message">
          <p>{msg}</p>
          {displayWord && <p>Correct word was: {wordData.word}</p>}
        </div>
      )}
      <div className="button-section">
        <div className="guess-section">
          <button onClick={restartGameFunction} className="restart-button">
            Restart
          </button>
          <button
            onClick={removeCharacterFunction}
            disabled={!chosenLetters.length}
            className="remove-button"
          >
            Remove Last Letter
          </button>
        </div>
        <div className="letter-selection">
          {displayLettersFunction()}
        </div>
        <div className="hints">
          Hints Remaining: {hints}
          <button onClick={hintFunction} disabled={hints === 0}>Hint</button>
        </div>
      </div>
    </div>
  );
};

export default GFGWordGame;
