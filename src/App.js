import { Game } from "./game";
import { Words } from "./data";
import { useEffect, useState } from "react";
function App() {
  const [word, setWord] = useState([]);
  const [category, setCategory] = useState([]);
  // const [NEWWORD, setNewWord] = useState([]);
  function getNewWord() {
    const allKeys = Object.keys(Words);
    const randomKeyNum = Math.floor(Math.random() * allKeys.length);
    const randomKey = allKeys[randomKeyNum];
    const randomKeyValues = Words[randomKey];
    const randomValueNum = Math.floor(Math.random() * randomKeyValues.length);
    const selectedValue = randomKeyValues[randomValueNum];

    const letters = Array.from(selectedValue.toLowerCase());
    setWord(letters);
    setCategory(randomKey);
  }
  console.log(word);
  // useEffect(() => {
  //   getNewWord();
  // }, []);
  useEffect(() => {
    getNewWord(word, category);
  }, []);
  return (
    <>
      <Game word={word} category={category} NewWord={getNewWord} />
    </>
  );
}

export default App;
