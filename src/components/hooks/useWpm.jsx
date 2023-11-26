import { useState, useEffect } from "react";

const useWpmCalculator = (startTime, endTime, inputText, words) => {
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (endTime > 0) {
      const timeElapsed = (endTime - startTime) / 1000 / 60;
      const enteredWords = inputText.trim().split(/\s+/);
      const correctCharacters = enteredWords.reduce((total, enteredWord, index) => {
        const correctWord = words[index] || "";
        let correctCharactersInWord = 0;

        for (let i = 0; i < enteredWord.length; i++) {
          if (enteredWord[i] === correctWord[i]) {
            correctCharactersInWord++;
          }
        }

        return total + correctCharactersInWord;
      }, 0);

      const calculatedWpm = correctCharacters / 5 / timeElapsed;
      setWpm(calculatedWpm);
    }
  }, [endTime, startTime, inputText, words]);

  return wpm;
};

export default useWpmCalculator;
