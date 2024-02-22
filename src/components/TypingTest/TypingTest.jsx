import React, { useState, useRef, useEffect } from "react";
import data from "../../data/words.json";
import { WpmCalculator } from "../../services/Wpm.js";
import useWpmCalculator from "../hooks/useWpm.jsx";
import Timer from "../Timer.jsx";
import classes from "./TypingTest.module.css";

const TypingTest = () => {
	const [inputText, setInputText] = useState("");
	const [words, setWords] = useState([]);
	const inputRef = useRef(null);
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [isTestStarted, setIsTestStarted] = useState(false);
	const [isTestComplete, setIsTestComplete] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	const wpm = useWpmCalculator(startTime, endTime, inputText, words);

	useEffect(() => {
		const shuffledWords = data.words.sort(() => Math.random() - 0.5);
		setWords(shuffledWords);
	}, []);

	const startTest = () => {
		if (inputText.length === 0 && !isTestComplete) {
			setStartTime(Date.now());
			setIsTestStarted(true);
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isTyping) {
				startTest();
				setTimeLeft(5);
				setIsTyping(true);
			}

			if (e.code === "Tab") {
				e.preventDefault();
				window.location.reload();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isTyping]);

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

	const handleInputChange = (e) => {
		const userInput = e.target.value;
		setInputText(userInput);

		if (userInput.trim().split(/\s+/).length > 0) {
			setWordCount(userInput.trim().split(/\s+/).length);
		}

		if (userInput.length === words.length) {
			setEndTime(Date.now());
			setIsTestComplete(true);
		} else {
			// setEndTime(0);
			setIsTestComplete(false);
		}
	};
	const formattedWpm = Number.isFinite(wpm) ? wpm.toFixed(0) : "Calculating...";

	const renderWords = () => {
		const inputArray = inputText.split(/\s+/);
		return words.map((word, wordIndex) => {
			let wordLetters = word.split("");
			let enteredWord = inputArray[wordIndex] || "";

			return (
				<div
					key={wordIndex}
					className={classes.Word}
					style={{ position: "relative" }}
				>
					{wordLetters.map((letter, letterIndex) => {
						let inputLetter = enteredWord[letterIndex];

						let letterColor = "lightGray";

						if (inputLetter !== undefined) {
							if (inputLetter === letter) {
								letterColor = "white";
							} else {
								letterColor = "red";
							}
						}

						return (
							<span
								key={letterIndex}
								style={{
									color: letterColor,
								}}
							>
								{letter}
							</span>
						);
					})}
					{enteredWord.length > word.length && (
						<span
							key={wordIndex}
							style={{
								color: "red",
								// fontSize: "16px",
								// fontWeight: "bold",
							}}
						>
							{enteredWord.slice(word.length)}
						</span>
					)}
					{wordIndex === inputArray.length - 1 && (
						<span
							className={classes.Caret}
							style={{
								position: "absolute",
								left: enteredWord.length * 13.5 + "px", // Позиция каретки
								height: "100%",
								width: "2px",
								// backgroundColor: 'black',
							}}
						/>
					)}
				</div>
			);
		});
	};

	return (
		<>
			<div
				className={classes.TestWordsWrapper}
				style={{ fontFamily: "Arial", fontSize: "18px", lineHeight: "24px" }}
			>
				<div className={classes.TestWords}>
					<p>{timeLeft} </p>
					{renderWords()}
					<p>Words per Minute (WPM): {formattedWpm}</p>
				</div>
				<input
					type="text"
					ref={inputRef}
					value={inputText}
					onChange={handleInputChange}
					style={{
						fontSize: "18px",
						padding: "5px",
						width: "1px",
						height: "1px",
						position: "absolute",
						top: "-100px",
						left: "-100px",
						opacity: 0,
						overflow: "hidden",
					}}
				/>
				{/* {isTestStarted && !isTestComplete && (
					// <Timer  />
				)} */}
			</div>
		</>
	);
};
export default TypingTest;
