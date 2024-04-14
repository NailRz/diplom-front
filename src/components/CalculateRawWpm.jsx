const CalculateRawWpm = (startTime, endTime, inputText) => {
	const timeElapsed = (endTime - startTime) / 1000 / 60;
	const charactersTyped = inputText.length;
	const rowWpm = charactersTyped / 5 / timeElapsed;
	return rowWpm;
};

export default CalculateRawWpm;
