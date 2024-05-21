import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WORDS } from "./Words";
import Button from "../../components/Button";
import "./WordsPerMinute.css";

export default function WordsPerMinute() {
  const navigate = useNavigate();
  const [word, setWord] = useState(
    () => WORDS[Math.floor((Math.random() * WORDS.length) | 0)]
  );
  const [characterCount, setCharacterCount] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [time, setTime] = useState(0);
  const [scoreIncrement, setScoreIncrement] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem("highScore");
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (buffer === word) {
      setWord(WORDS[Math.floor((Math.random() * WORDS.length) | 0)]);
      setTimeout(
        () =>
          setCharacterCount((characterCount) => characterCount + word.length),
        803
      );
      setScoreIncrement(word.length);
      setTimeout(() => setScoreIncrement(0), 800);
    } else {
      setInputError(true);
      setTimeout(() => setInputError(false), 400);
    }
    setBuffer("");
  }

  useEffect(() => {
    if (time === 0 && characterCount > highScore) {
      setHighScore(characterCount);
      localStorage.setItem("highScore", characterCount.toString());
    }
  }, [time, characterCount, highScore]);

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [time]);

  useEffect(() => {
    localStorage.setItem("highScore", highScore.toString());
  }, [highScore]);

  function resetScore() {
    setCharacterCount(0);
  }

  function resetHighScore() {
    setHighScore(0);
    localStorage.removeItem("highScore");
  }

  return (
    <div className="wpm-container">
      {!time ? (
        <h1>Words Per Minute</h1>
      ) : (
        <h5 className="wpm-timeleft">Time left</h5>
      )}
      {time > 0 && <h3>{time}</h3>}

      {!time && (
        <div className="wpm-rules">
          <p>
            Rules:
            <p>
              1. You have 60 seconds to type as many words as you can. Each
              letter of the word adds a point.
            </p>
            <p>2. If you type the word correctly, you will get a new word.</p>
            <p>3. If you miss and submit, your try will be deleted.</p>
            <p>4. The game ends when the time is up.</p>
          </p>
        </div>
      )}
      {Boolean(time) && <h1>{word}</h1>}
      {time ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              value={buffer}
              type="text"
              onChange={(e) => setBuffer(e.target.value)}
              className={`wpm-input ${inputError ? "input-error" : ""}`}
            />
          </form>
        </div>
      ) : (
        <Button
          style={{
            fontSize: "30px",
            width: "200px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          onClick={() => {
            setTime(60);
            resetScore();
            setBuffer("");
          }}
        >
          Play
        </Button>
      )}
      <div className="wpm-score">
        <h4>
          Score: {characterCount}{" "}
          {scoreIncrement > 0 && (
            <span className="score-increment">+{scoreIncrement}</span>
          )}
        </h4>{" "}
        {!time && (
          <h4>
            {" "}
            High Score: {highScore}{" "}
            <Button
              style={{
                border: "none",
                padding: "0",
              }}
              onClick={resetHighScore}
            >
              <img
                className="wpm-refresh"
                src="https://icongr.am/feather/rotate-ccw.svg?size=20&color=b2aeae"
                title="Reset high score"
              />
            </Button>
          </h4>
        )}
      </div>
      <Button
        style={{
          fontSize: "14px",
          width: "160px",
          marginTop: "40px",
        }}
        onClick={() => navigate("/")}
      >
        Back to main
      </Button>
    </div>
  );
}
