import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import data from "./words.json";

function App() {
	const [inputText, setInputText] = useState("");
	const [words, setWords] = useState([]);
	const inputRef = useRef(null);
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [wpm, setWpm] = useState(0);
	const [isTestComplete, setIsTestComplete] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0); // Время в секундах
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		// Случайная перестановка массива слов
		const shuffledWords = data.words.sort(() => Math.random() - 0.5);
		setWords(shuffledWords);
	}, []);

	const startTest = () => {
		if (inputText.length === 0 && !isTestComplete) {
			setStartTime(Date.now());
			setIsTestComplete(false);
			setTimeLeft(5);
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		const handleKeyPress = () => {
			if (!isTyping) {
				startTest();
				setIsTyping(true);
			}
		};

		window.addEventListener("keypress", handleKeyPress);

		return () => {
			window.removeEventListener("keypress", handleKeyPress);
		};
	}, [isTyping]);

	useEffect(() => {
		let timer;
		if (timeLeft > 0 && !isTestComplete) {
			timer = setTimeout(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000); // Каждую секунду
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
			setEndTime(0);
			setIsTestComplete(false);
		}
	};

	const calculateWPM = () => {
		const timeElapsed = (endTime - startTime) / 1000 / 60;
		const charactersTyped = inputText.length;
		const calculatedWpm = charactersTyped / 5 / timeElapsed;
		setWpm(calculatedWpm);
	};

	useEffect(() => {
		if (isTestComplete && endTime > 0) {
			calculateWPM();
		}
	}, [endTime, isTestComplete]);

	const formattedWpm = Number.isFinite(wpm) ? wpm.toFixed(0) : "Calculating...";

	const renderWords = () => {
		const inputArray = inputText.split(/\s+/);
		return words.map((word, wordIndex) => {
			let wordLetters = word.split("");
			let enteredWord = inputArray[wordIndex] || "";

			return (
				<div
					key={wordIndex} // Добавили ключ к внешнему элементу
					style={{
						background: "gray",
						display: "inline-block",
						marginInline: "3px",
					}}
				>
					{wordLetters.map((letter, letterIndex) => {
						let inputLetter = enteredWord[letterIndex];

						let letterColor = "white";

						if (inputLetter !== undefined) {
							if (inputLetter === letter) {
								letterColor = "green";
							} else {
								letterColor = "red";
							}
						}

						return (
							<span
								key={letterIndex} // Добавили ключ к каждому <span>
								style={{
									color: letterColor,
									// cursor: "text",
								}}
							>
								{letter}
							</span>
						);
					})}
					{enteredWord.length > word.length && (
						<span
							key="extra" // Добавили ключ к элементу с дополнительными буквами
							style={{
								color: "red",
								fontSize: "16px",
								fontWeight: "bold",
							}}
						>
							{enteredWord.slice(word.length)}
						</span>
					)}
				</div>
			);
		});
	};

	return (
		<>
			<div
				style={{ fontFamily: "Arial", fontSize: "18px", lineHeight: "24px" }}
			>
				<div style={{ marginBottom: "10px" }}>{renderWords()}</div>
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
				<p>Time Left: {timeLeft} seconds</p>
				<p>Words per Minute (WPM): {formattedWpm}</p>
			</div>
		</>
	);
}

export default App;
