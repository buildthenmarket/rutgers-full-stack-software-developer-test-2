import React, { useState, useEffect, useRef } from "react";
import styles from "./AnagramHunt.module.css";

const AnagramHunt: React.FC = () => {
  const [anagramsData, setAnagramsData] = useState<any | null>(null);
  const [currentScreen, setCurrentScreen] = useState<
    "start" | "play" | "gameOver"
  >("start");
  const [wordLength, setWordLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentAnagramSet, setCurrentAnagramSet] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<Set<string>>(new Set());
  const [remainingAnagrams, setRemainingAnagrams] = useState(0);
  const [timerID, setTimerID] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/anagrams.json")
      .then((response) => response.json())
      .then((data) => {
        setAnagramsData(data);
      })
      .catch((error) => {
        console.error("Error loading anagrams data:", error);
      });
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGuessedWords(new Set());
    setCurrentScreen("play");
    loadNewSet();
    startTimer();
  };

  const loadNewSet = () => {
    if (!anagramsData) return;

    const setsForLength = anagramsData[wordLength];
    if (!setsForLength || setsForLength.length === 0) {
      setCurrentScreen("gameOver");
      stopTimer();
      return;
    }

    const randomSet =
      setsForLength[Math.floor(Math.random() * setsForLength.length)];
    setCurrentAnagramSet(randomSet);

    const randomWord = randomSet[Math.floor(Math.random() * randomSet.length)];
    setCurrentWord(randomWord);

    setGuessedWords(new Set());

    setRemainingAnagrams(randomSet.length - 1);
  };

  const startTimer = () => {
    stopTimer();
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          setCurrentScreen("gameOver");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerID(id);
  };

  const stopTimer = () => {
    if (timerID !== null) {
      clearInterval(timerID);
      setTimerID(null);
    }
  };

  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guess = inputRef.current?.value.trim().toLowerCase() || "";

    e.currentTarget.reset();

    if (
      currentAnagramSet.includes(guess) &&
      guess !== currentWord &&
      !guessedWords.has(guess)
    ) {
      setGuessedWords((prev) => new Set(prev).add(guess));
      setScore((prev) => prev + 1);
      setRemainingAnagrams((prev) => prev - 1);
    }

    inputRef.current?.focus();
  };

  if (currentScreen === "start") {
    return (
      <main className={styles.container}>
        <h1>Anagram Hunt</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="wordLength">Word length:</label>
          <select
            id="wordLength"
            value={wordLength.toString()}
            onChange={(e) => setWordLength(parseInt(e.target.value))}
            className="form-select"
          >
            {[5, 6, 7, 8].map((length) => (
              <option key={length} value={length.toString()}>
                {length}-letter words
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={startGame}
            className="btn btn-success ms-2"
          >
            Play!
          </button>
        </form>

        <ol>
          <li>Select a word length.</li>
          <li>
            Press <strong>Play!</strong> to start.
          </li>
          <li>Find as many anagrams as you can in 60 seconds.</li>
          <li>Type an anagram and press Enter to submit.</li>
        </ol>
      </main>
    );
  }

  if (currentScreen === "play") {
    return (
      <main className={styles.container}>
        <div className={styles.gameInterface}>
          <h2>Anagram Hunt</h2>
          <div className={styles.gameInfo}>
            <div>
              <strong>Word:</strong> {currentWord}
            </div>
            <div>
              <strong>Anagrams left:</strong> {remainingAnagrams}
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.score}>Score: {score}</div>
            <div className={styles.timer}>Time: {timeLeft}s</div>
          </div>
          <form onSubmit={handleGuess}>
            <label htmlFor="guess">Your guess:</label>
            <input
              type="text"
              id="guess"
              ref={inputRef}
              autoComplete="off"
              maxLength="20"
              className={styles.input}
              placeholder="Type an anagram..."
            />
          </form>
          {guessedWords.size > 0 && (
            <div className={styles.guessedList}>
              <h3>Found anagrams:</h3>
              <ul>
                {Array.from(guessedWords)
                  .sort()
                  .map((word) => (
                    <li key={word}>{word}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.gameOver}>
        <h2>Game Over!</h2>
        <p className={styles.score}>Your score: {score}</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <button
            type="button"
            onClick={startGame}
            className="btn btn-success me-2"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentScreen("start");
              setScore(0);
              setTimeLeft(60);
              setGuessedWords(new Set());
              setCurrentAnagramSet([]);
              setCurrentWord("");
              setRemainingAnagrams(0);
              setWordLength(5);
              stopTimer();
            }}
            className="btn btn-outline-secondary"
          >
            Back to Start Screen
          </button>
        </div>
      </div>
    </main>
  );
};

export default AnagramHunt;