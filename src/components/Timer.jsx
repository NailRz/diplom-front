import React, { useState, useEffect } from "react";

const Timer = ({ prevTimeLeft, isTestComplete }) => {
	const [timeLeft, setTimeLeft] = useState(prevTimeLeft);
	useEffect(() => {
		let timer;

		if (timeLeft > 0 && !isTestComplete && isTestStarted) {
			timer = setTimeout(() => {
				// console.log(timeLeft - 1);
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
			dispatch(updateEndTime(Date.now()));
		}
		if (timeLeft === 0) {
			dispatch(updateEndTime(Date.now()));
		}

		return () => {
			clearTimeout(timer);
		};
	}, [timeLeft, isTestComplete, isTestStarted]);
  return {timeLeft}
};


export default Timer;
