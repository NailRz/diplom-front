import { useState, useEffect } from "react";

const useWpmCalculator = (startTime, endTime, inputText, words) => {
	const [wpm, setWpm] = useState(0);

	useEffect(() => {
		// Рассчет WPM при каждом изменении вводимого текста
		const timeElapsed = (Date.now() - startTime) / 1000 / 60;
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
		setWpm(calculatedWpm);
	}, [inputText, words, startTime]);
	return wpm;
};

export default useWpmCalculator;
