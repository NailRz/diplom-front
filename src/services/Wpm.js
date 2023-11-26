const WpmCalculator = (startTime, endTime, inputText) => {
	const timeElapsed = (endTime - startTime) / 1000 / 60;
	const charactersTyped = inputText.length;
	return charactersTyped / 5 / timeElapsed;
};

export { WpmCalculator };
