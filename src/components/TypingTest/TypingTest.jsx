/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useMemo } from "react";
import useWpmCalculator from "../hooks/useWpm.jsx";
import classes from "./TypingTest.module.css";
import { useNavigate } from "react-router-dom";
import ResultPage from "../../pages/testPage/ResultPage.jsx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeTime, changeWpm, updateTime, updateWpm } from "../../features/testData/testDataSlice.js";
import { selectIsTestComplete, updateIsTestComplete } from "../../features/testStatesSlice/testStatesSlice.js";


const TypingTest = ({ wordsProp, isWordsLoading}) => {
	

	const [inputText, setInputText] = useState("");
	const [words, setWords] = useState([]);
	const inputRef = useRef(null);
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [isTestStarted, setIsTestStarted] = useState(false);
	// const [isTestComplete, setIsTestComplete] = useState(false);
	const isTestComplete = useSelector(selectIsTestComplete)
	const [isTestInvalid, setIsTestInvalid] = useState(false);
	const [timeLeft, setTimeLeft] = useState(5);
	const [isTyping, setIsTyping] = useState(false);
	const wpm = useWpmCalculator(startTime, endTime, inputText, words);
	let formattedWpm = Number.isFinite(wpm) ? wpm.toFixed(0) : "Calculating...";

	const dispatch = useDispatch()
	let saveTime = 0
	if (saveTime < timeLeft ){
		saveTime = timeLeft
		dispatch(updateTime(saveTime))}

	
	

	const navigate = useNavigate();

	// const flatWordsArr = wordsProp ? wordsProp.flatMap(word => word.split(', ')) : [];
	// const flatWordsArr = wordsProp.flatMap(word => word.split(', '));
	// console.log(flatWordsArr)

	// const flatWordsArr = wordsProp.reduce((acc, word) => {
	// 	const words = word.split(', ');
	// 	return [...acc, ...words];
	//   }, []);

	//   console.log(flatWordsArr)
	const flatWordsArr = useMemo(() => {
		return wordsProp ? wordsProp.flatMap((word) => word.split(", ")) : [];
	}, [wordsProp]);

	useEffect(() => {
		if (flatWordsArr.length > 2) {
			setWords(flatWordsArr.sort(() => Math.random() - 0.5));
		}
	}, [flatWordsArr]);

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
				// setTimeLeft(5);
				setIsTyping(true);
				console.log("handleKeyDown");
				// saveTime = timeLeft;	
				console.log("sava", saveTime);
			}

			// if (e.code === "Tab") {
			// 	dispatch(updateIsTestComplete(false))
			// 	e.preventDefault();
			// 	window.location.reload();
			// }
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isTyping]);

	useEffect(() => {
		let timer;
		console.log(timeLeft, isTestComplete, isTestStarted);

		if (timeLeft > 0 && !isTestComplete && isTestStarted) {
			console.log("da");
			timer = setTimeout(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		}
		
		if (isTestComplete) {
			console.log("pora");
		}

		return () => {
			clearTimeout(timer);
		};
	}, [timeLeft, isTestComplete, isTestStarted]);

	useEffect(() => {
		if (timeLeft === 0) {
			setEndTime(Date.now());
			
			dispatch(updateIsTestComplete(true))
			dispatch(updateWpm(wpm))

		}
	}, [dispatch, formattedWpm, isTestComplete, timeLeft])

	const handleInputChange = (e) => {
		const userInput = e.target.value;
		setInputText(userInput);

		if (userInput.trim().split(/\s+/).length > 0) {
			setWordCount(userInput.trim().split(/\s+/).length);
		}

		if (userInput.length === words.length) {
			setEndTime(Date.now());

			dispatch(updateIsTestComplete(true));

		} else {
			// setEndTime(0);
			dispatch(updateIsTestComplete(false));
		}
	};
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

						let letterColor = "#596172";

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
							className={isTestStarted ? classes.CaretS : classes.Caret}
							style={{
								position: "absolute",
								left: enteredWord.length * 13.75 + "px",
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
					{isWordsLoading ? <h3>Идет загрузка... </h3> : renderWords()}
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
			</div>
		</>
	);
};
export default TypingTest;
