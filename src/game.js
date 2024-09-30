import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Words } from "./data";
import { Navbar } from "./navbar";

export const Game = ({ word, category, NewWord }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [letters, setLetters] = useState(
    Array.from("abcdefghijklmnopqrstuvwxyz")
  );
  let [myLetter, setLetter] = useState([]);
  let [wordwithoutspace, setWordwithoutspace] = useState(Words);
  let [fault, setFault] = useState(0);
  let [correct, setCorrect] = useState(0);
  let [tries, settries] = useState(5);
  let [isclicked, setIsclicked] = useState({});
  let [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  let [wrong, setWrong] = useState(0);
  let correctguesses = false;
  function CheckLetter(e) {
    let guessedletter = e.target.textContent.toLowerCase();
    e.target.classList.add("clicked");
    setIsclicked((prevState) => ({ ...prevState, [guessedletter]: true }));
    let correctguess = false;

    word.forEach((letter, index) => {
      if (letter.toLowerCase() === guessedletter) {
        correctguess = true;
        setLetter((prev) => [...prev, { id: index, text: letter }]);
      }
    });
    setWordwithoutspace(
      word.filter((letter) => {
        return letter !== " ";
      })
    );
    setWordwithoutspace(word.filter((letter) => letter !== " "));
    if (!correctguess) {
      setFault((prev) => prev + 1);
      setWrong((prev) => prev + 1);
    }
  }

  if (myLetter.length === wordwithoutspace.length) {
    correctguesses = true;
  }
  function resetGame() {
    if (fault === tries) {
      setFault(0);
      setLetter([]);
      setIsclicked({});
      NewWord(word, category);
    }
  }
  function getNewWord() {
    if (fault < tries && correctguesses === true) {
      setCorrect((prev) => prev + 1);
      setLetter([]);
      setIsclicked({});
      NewWord(word, category);
      setConsecutiveCorrect((prev) => prev + 1);
    }
    if (consecutiveCorrect + 1 === 2 && wrong === 0) {
      settries((prev) => prev + 1);
      setConsecutiveCorrect(0);
      setWrong(0);
    }
    if (wrong !== 0) {
      setWrong(0);
      setConsecutiveCorrect(0);
    }
  }
  console.log(consecutiveCorrect);
  console.log(wrong);
  console.log(fault);
  console.log(tries);
  return (
    <>
      <Navbar cate={category} correct={correct} />
      <div className="container">
        <div className="row">
          <div className="hangman-draw">
            <div
              className="the-draw"
              style={{
                display: isMobile ? "block" : fault >= 1 ? "block" : "none",
                borderBottom: isMobile
                  ? fault >= 1
                    ? "4px solid #222"
                    : "none"
                  : fault >= 1
                  ? "4px solid #222"
                  : "none",
              }}
            >
              <div className="the-man">
                <div
                  className="legs"
                  style={{ display: fault >= 1 ? "block" : "none" }}
                ></div>
                <div
                  className="body"
                  style={{ display: fault >= 3 ? "block" : "none" }}
                ></div>
                <div
                  className="head"
                  style={{ display: fault >= 3 ? "block" : "none" }}
                ></div>
                <div
                  className="hands"
                  style={{ display: fault >= 4 ? "block" : "none" }}
                ></div>
              </div>
              <div
                className="the-stand"
                style={{ display: fault >= 2 ? "block" : "none" }}
              ></div>
              <div
                className="the-hang"
                style={{ display: fault >= 4 ? "block" : "none" }}
              ></div>
              <div
                className="the-rope"
                style={{ display: fault === tries ? "block" : "none" }}
              ></div>
            </div>
          </div>

          {/* Letter guessing section */}
          <div
            className="letters"
            style={{
              pointerEvents: fault === tries || correctguesses ? "none" : "",
            }}
          >
            {letters.map((letter) => (
              <span
                className={`letter-box ${isclicked[letter] ? "clicked" : ""}`}
                key={letter}
                onClick={(e) => !isclicked[letter] && CheckLetter(e)}
              >
                {letter.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Word display */}
        <div
          className="letters-guess"
          style={{
            backgroundColor:
              fault === tries ? "red" : correctguesses ? "green" : "",
          }}
        >
          {word.map((letter, index) => (
            <span key={index} className={letter === " " ? "with-space" : ""}>
              {myLetter.some((g) => g.text === letter) ? letter : " "}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="button">
        <button
          style={{ display: correctguesses ? "block" : "none" }}
          onClick={getNewWord}
        >
          Next
        </button>
        <button
          style={{ display: fault === tries ? "block" : "none" }}
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
    </>
  );
};
