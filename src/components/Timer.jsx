import React, { useState, useEffect } from "react";

const Timer = ({ timeLeft, isTestComplete }) => {
  
  useEffect(() => {
    
		let timer;
		if (timeLeft > 0 && !isTestComplete) {
			timer = setTimeout(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setEndTime(Date.now());
			setIsTestComplete(true);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [timeLeft, isTestComplete]);
  return <p>Time Left: {timeLeft} seconds</p>;
};


export default Timer;
