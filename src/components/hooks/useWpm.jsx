import { useState, useEffect } from "react";

const useWpmCalculator = (
	startTime,
	endTime,
	inputText,
	words,
	isTestComplete
) => {
	const [wpm, setWpm] = useState(0);
	const [timeElapsed, setTimeElapsed] = useState(0);
	useEffect(() => {		
		setTimeElapsed((endTime - startTime) / 1000 / 60);

		const enteredWords = inputText.trim().split(/\s+/);
		const correctCharacters = enteredWords.reduce(
			(total, enteredWord, index) => {
				const correctWord = words[index] || "";
				let correctCharactersInWord = 0;

				for (let i = 0; i < enteredWord.length; i++) {
					if (enteredWord[i] === correctWord[i]) {
						correctCharactersInWord++;
					}
				}
				return total + correctCharactersInWord;
			},
			0
		);

		const calculatedWpm = correctCharacters / 5 / timeElapsed;
		// const accuracy = correctCharacters / 
		setWpm(calculatedWpm);
		
	}, [inputText, words, startTime, endTime, isTestComplete, timeElapsed]);
	return wpm;
};

export default useWpmCalculator;
