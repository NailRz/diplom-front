// import { useEffect } from "react";

const UpdateHandler = (inputText, words) => {
	let uncorrectLetter = 0;

	// useEffect(() => {
	const inputArray = inputText.split(/\s+/);

	// words.map((word, wordIndex) => {
	// 	let wordLetters = word.split("");
	// 	let enteredWord = inputArray[wordIndex] || "";
	// 	wordLetters.map((letter, letterIndex) => {
	// 		let inputLetter = enteredWord[letterIndex];

	// 			if (inputLetter != letter || inputLetter !== undefined) {
	// 				uncorrectLetter++;
	// 				console.log("ds;ldjksaldjksakl");

	// 		}
	// 	});
	// });
	// console.log("mamamammamamamam");
	// console.log(uncorrectLetter);


    
	const enteredWords = inputText.trim().split(/\s+/);
	// const words = words.trim().split(/\s+/);

	let correctCharacters = 0;
	let uncorrectCharacters = 0;
	let totalCharacters = 0;

	for (let i = 0; i < enteredWords.length && i < words.length; i++) {
		const enteredWord = enteredWords[i];
		const correctWord = words[i];
		if (enteredWord.length > correctWord.length) {
			uncorrectCharacters += enteredWord.length - correctWord.length;
		}
		for (let j = 0; j < enteredWord.length && j < correctWord.length; j++) {
			if (enteredWord[j] === correctWord[j]) {
				correctCharacters++;
			}
			totalCharacters++;
		}
	}

	return uncorrectLetter;
	// },[inputText, uncorrectLetter, words]);
};

export default UpdateHandler;
