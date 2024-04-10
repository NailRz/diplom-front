const testAccuracy = (inputText, words) => {
    const enteredWords = inputText.trim().split(/\s+/);
		// const words = words.trim().split(/\s+/);

		let correctCharacters = 0;
		let uncorrectCharacters = 0;
		let totalCharacters = 0;

		for (let i = 0; i < enteredWords.length && i < words.length; i++) {
			const enteredWord = enteredWords[i];
			const correctWord = words[i];
			if (enteredWord.length > correctWord.length) {
				uncorrectCharacters+= enteredWord.length - correctWord.length;
			}
			for (let j = 0; j < correctWord.length; j++) {
				if (enteredWord[j] === correctWord[j]) {
					correctCharacters++;
				}
				totalCharacters++;
			}
		}
		let calculatedAccuracy = 0;
		if (totalCharacters > 0)
			calculatedAccuracy =
				((correctCharacters - uncorrectCharacters) / totalCharacters) * 100;

		// setAccuracy(calculatedAccuracy);
		// setIsLoading(false);
        console.log(calculatedAccuracy)
    return calculatedAccuracy
};

export default testAccuracy;