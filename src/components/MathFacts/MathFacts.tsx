import React, { useState, useEffect, useRef } from 'react';
import styles from './MathFacts.module.css';

const MathFacts: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
  const [operation, setOperation] = useState<'addition' | 'subtraction' | 'multiplication' | 'division'>('addition');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [problem, setProblem] = useState<string>('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const answerRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const generateProblem = () => {
    let num1: number, num2: number, answer: number;
    
    switch (operation) {
      case 'addition':
        num1 = Math.floor(Math.random() * 21);
        num2 = Math.floor(Math.random() * 21);
        answer = num1 + num2;
        break;
      case 'subtraction':
       
        num1 = Math.floor(Math.random() * 21);
        num2 = Math.floor(Math.random() * (num1 + 1));
        answer = num1 - num2;
        break;
      case 'multiplication':
        num1 = Math.floor(Math.random() * 13);
        num2 = Math.floor(Math.random() * 13);
        answer = num1 * num2;
        break;
      case 'division':
       
        num2 = Math.floor(Math.random() * 12) + 1;
        const multiplier = Math.floor(Math.random() * 13);
        num1 = num2 * multiplier;
        answer = multiplier;
        break;
    }
    
    setCorrectAnswer(answer);
    
   
    const operatorMap: Record<string, string> = {
      addition: '+',
      subtraction: '-',
      multiplication: '×',
      division: '÷'
    };
    
    setProblem(`${num1} ${operatorMap[operation]} ${num2} = `);
  };

 
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setGameState('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const checkAnswer = () => {
    const userAnswer = parseInt(answer) || 0;
    
    if (userAnswer === correctAnswer) {
      setScore(prev => prev + 1);
      setAnswer('');
      generateProblem();
    } else {
      setAnswer('');
    }
    
    answerRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const handleButtonClick = (value: string) => {
    setAnswer(prev => prev + value);
    answerRef.current?.focus();
  };

  const clearAnswer = () => {
    setAnswer('');
    answerRef.current?.focus();
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    generateProblem();
    startTimer();
  };

  const playAgain = () => {
    setGameState('start');
    setAnswer('');
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (gameState === 'playing' || (gameState === 'start' && answer === '')) {
      answerRef.current?.focus();
    }
  }, [gameState, answer]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (gameState === 'start') {
    return (
      <main className={styles.container}>
        <h1>Math Facts Practice</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="operation">Operation:</label>
          <select 
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="form-select"
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
          </select>
          <button 
            type="button"
            onClick={startGame}
            className="btn btn-success m-2"
          >
            Go
          </button>
        </form>

        <ol>
          <li>Select operation.</li>
          <li>Press <strong>Go</strong>.</li>
          <li>How many problems can you solve in 30 seconds?</li>
        </ol>
      </main>
    );
  }

  if (gameState === 'playing') {
    return (
      <main className={styles.container}>
            <div className={styles.gameInterface}>
              <div className={styles.problem}>
                {problem}
              </div>
              <input
                type="text"
                id="answer"
                ref={answerRef}
                autoComplete="off"
                maxLength="10"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.input}
                placeholder="Type answer..."
              />
              <div className={styles.keypad}>
                <div className="keypad-row d-flex">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleButtonClick(num.toString())}
                      className={`${styles.keyBtn} btn btn-outline-secondary`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="keypad-row d-flex">
                  {[4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleButtonClick(num.toString())}
                      className={`${styles.keyBtn} btn btn-outline-secondary`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="keypad-row d-flex">
                  {[7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleButtonClick(num.toString())}
                      className={`${styles.keyBtn} btn btn-outline-secondary`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="keypad-row d-flex">
                  <button
                    type="button"
                    onClick={clearAnswer}
                    className={`${styles.clearBtn} btn btn-outline-warning`}
                  >
                    C
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick('0')}
                    className={`${styles.keyBtn} btn btn-outline-secondary`}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={checkAnswer}
                    className={`${styles.submitBtn} btn btn-success`}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className={styles.score}>Score: {score}</div>
                <div className={styles.timer}>Time: {timeLeft}s</div>
              </div>
            </div>
      </main>
    );
  }

  return (
    <main className={`${styles.container} text-center py-5 ${styles.gameOver}`}>
      <h2>Game Over!</h2>
      <p className={styles.gameOver}>Your score: {score}</p>
      <button 
        type="button" 
        onClick={playAgain}
        className="btn btn-success mt-4"
      >
        Play Again
      </button>
    </main>
  );
};

export default MathFacts;