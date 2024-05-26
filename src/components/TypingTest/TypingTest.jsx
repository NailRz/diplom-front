/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useMemo } from "react";
import useWpmCalculator from "../hooks/useWpm.jsx";
import classes from "./TypingTest.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	selectEndTime,
	selectInputArray,
	selectInputText,
	selectMistakesArray,
	selectRawWpmArray,
	selectStartTime,
	selectWords,
	selectWpmArray,
	updateEndTime,
	updateInputArray,
	updateInputText,
	updateMistakesArray,
	updateRawWpmArray,
	updateStartTime,
	updateTime,
	updateWords,
	updateWpm,
	updateWpmArray,
} from "../../features/testData/testDataSlice.js";
import {
	selectIsTestComplete,
	updateIsTestComplete,
} from "../../features/testStatesSlice/testStatesSlice.js";
import addErrorToArray from "../addErrorToArray.jsx";
import CalculateRawWpm from "../CalculateRawWpm.jsx";
import Keyboard from "../UI/Keyboard/Keyboard.jsx";

export const TypingTest = ({ wordsProp, isWordsLoading }) => {
	const dispatch = useDispatch();
	const words = useSelector(selectWords);
	const inputText = useSelector(selectInputText);

	const inputRef = useRef(null);
	const caretRef = useRef();
	const wordRef = useRef();
	const [isTestStarted, setIsTestStarted] = useState(false);
	const isTestComplete = useSelector(selectIsTestComplete);
	const startTime = useSelector(selectStartTime);
	const endTime = useSelector(selectEndTime);
	const [timeLeft, setTimeLeft] = useState(60);
	const [testDuration, setTestDuration] = useState(60);
	const [isTyping, setIsTyping] = useState(false);
	const [userText, setUserText] = useState("");

	const [rowFlag, setRowFlag] = useState(0);
	const [rowFlag2, setRowFlag2] = useState(0);

	const [caretHeight, setCaretHeight] = useState(0);
	const [prevCaretHeight, setPrevCaretHeight] = useState(0);
	const [rowCount, setRowCount] = useState(0);

	const [notEnteredArray, setNotEnteredArray] = useState([]);
	const [errorArray, setErrorArray] = useState([]);
	let highlightKey;
	const [highlight, setHighlight] = useState(0);
	const wordsString = words.join(" ");

	useEffect(() => {
		if (localStorage.getItem("testDuration")) {
			setTimeLeft(localStorage.getItem("testDuration"));
			setTestDuration(localStorage.getItem("testDuration"));
		}
	}, []);

	const wpm = useWpmCalculator(
		startTime,
		endTime,
		inputText,
		words,
		isTestComplete
	);
	const rawWpm = CalculateRawWpm(startTime, endTime, inputText);

	useEffect(() => {
		dispatch(updateWpm(wpm));
	}, [isTestComplete, endTime, dispatch, wpm]);

	let formattedWpm = Number.isFinite(wpm) ? wpm.toFixed(2) : "Calculating...";
	let formattedRawWpm = Number.isFinite(rawWpm)
		? rawWpm.toFixed(2)
		: "Calculating...";

	const [saveTime, setSaveTime] = useState(-1);
	if (timeLeft > saveTime) {
		setSaveTime(timeLeft);
		dispatch(updateTime(timeLeft));
	}

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(updateWords(wordsProp ? wordsProp : []));
	}, [wordsProp]);

	const [correctWords, setCorrectWords] = useState(wordsProp);

	const inputArray = useSelector(selectInputArray);
	const mistakesArray = useSelector(selectMistakesArray);
	const wpmArray = useSelector(selectWpmArray);
	const rawWpmArray = useSelector(selectRawWpmArray);

	const startTest = () => {
		if (inputText.length === 0 && !isTestComplete) {
			dispatch(updateStartTime(Date.now()));
			// console.log(startTime, "starttime");
			setIsTestStarted(true);
			inputRef.current.focus();
		}
	};

	// useEffect(() => {
	// 	fillArray()
	// }, [timeLeft])
	// const fillArray = () => {
	// 	let newArray = [];
	// 	for (let i = 0; i < timeLeft; i++) {
	// 		newArray.push({ time: Number(i) });
	// 	}
	// 	setErrorArray(newArray);
	// };

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isTyping && e.code != "AltLeft") {
				startTest();
				setIsTyping(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isTyping]);

	useEffect(() => {
		if (userText) {
			dispatch(updateWpmArray([...wpmArray, wpm]));
			dispatch(updateRawWpmArray([...rawWpmArray, rawWpm]));
		}

		if (timeLeft === 0) {
			dispatch(updateWpm(wpm));
			dispatch(updateIsTestComplete(true));
		}
	}, [timeLeft]);

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
		if (isTestComplete) {
			console.log("pora");
		}

		return () => {
			clearTimeout(timer);
		};
	}, [timeLeft, isTestComplete, isTestStarted]);

	const [statsArray, setStatsArray] = useState([]);
	// useEffect(() => {
	// 	if (isTestStarted){
	// 		setStatsArray(statsArray.push(wpm));
	// 	}
	// }, [timeLeft])

	useEffect(() => {
		if (caretHeight != prevCaretHeight) {
			rowFlag2 ? setRowFlag((prev) => !prev) : setRowFlag2((prev) => !prev);
			if (rowFlag) {
				caretHeight > prevCaretHeight
					? setRowCount((prev) => prev + 1)
					: setRowCount((prev) => prev - 1);
			}
		}
		setPrevCaretHeight(caretHeight);
	}, [caretHeight, prevCaretHeight, rowFlag, rowFlag2]);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);

	// useEffect(() => {
	// 	if (currentCharIndex) {
	// 		// console.log(currentCharIndex);
	// 	}
	// },[currentCharIndex])
	const [index, setIndex] = useState(0);
	const handleInputChange = (e) => {
		const userInput = e.target.value;
		const cleanedInput = userInput.replace(/\s+/g, " ");
		const inputAr = userInput.split(" ");

		// console.log(cleanedInput);


		let err = 0;
		for (let i = 0; i < inputAr.length; i++) {
			if (inputAr[i].length > wordsProp[i].length) {
				err += inputAr[i].length - wordsProp[i].length;
			}
			if (i >= 1 && inputAr[i - 1].length < wordsProp[i - 1].length) {
				err -= wordsProp[i - 1].length - inputAr[i - 1].length;
			}
		}
		// console.log(cleanedInput.length -err)

		// console.log(err);
		setUserText(userInput);
		if (userInput) {
			const caretRect = caretRef.current.getBoundingClientRect().y.toFixed(0);
			setCaretHeight(caretRect);

			setErrorArray(addErrorToArray(userInput, words, errorArray, timeLeft));

			dispatch(updateMistakesArray(errorArray));
			dispatch(updateInputArray(userInput.trim().split(/\s+/)));
			setCurrentCharIndex(userInput.length);
			if (userInput.length) {
				highlightKey = wordsString[cleanedInput.length - err].toUpperCase();
				// console.log(highlightKey);
			}
			setHighlight(highlightKey);
			// console.log(highlightKey);
		}

		dispatch(updateInputText(userInput));
		dispatch(updateEndTime(Date.now()));

		// testAccuracy(inputText,words)

		// if (userInput.trim().split(/\s+/).length > 0) {
		// 	dispatch(updateInputArray(userInput.trim().split(/\s+/).length));
		// }

		// if (userInput.length === words.length) {
		// 	// setEndTime(Date.now());
		// } else {
		// 	dispatch(updateIsTestComplete(false));
		// }
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
					style={{
						position: "relative",
						transform: `translateY(${rowCount < 0 ? 0 : rowCount * -36.5}px)`,
					}}
				>
					{wordLetters.map((letter, letterIndex) => {
						let inputLetter = enteredWord[letterIndex];
						let letterColor = "#596172";
						if (inputLetter !== undefined) {
							if (inputLetter === letter) {
								letterColor = "white";
							}
							if (inputLetter != letter) {
								letterColor = "red";
							}
						}

						return (
							<span key={letterIndex} style={{ color: letterColor }}>
								{letter}
							</span>
						);
					})}
					{enteredWord.length > word.length && (
						<span key={wordIndex} style={{ color: "red" }}>
							{enteredWord.slice(word.length)}
						</span>
					)}
					{wordIndex === inputArray.length - 1 && (
						<span
							className={isTestStarted ? classes.CaretS : classes.Caret}
							ref={caretRef}
							style={{ left: enteredWord.length * 13.75 + "px" }}
						/>
					)}
				</div>
			);
		});
	};

	const selectorHandler = (event) => {
		setTimeLeft(event.target.value);
		setTestDuration(event.target.value);
		console.log(event.target.value);
		localStorage.setItem("testDuration", event.target.value);
		dispatch(updateTime(event.target.value));
	};

	return (
		<>
			<div
				className={classes.TestWordsWrapper}
				style={{ fontSize: "18px", lineHeight: "24px" }}
			>
				<div className={classes.TestWords}>
					<p>{timeLeft} </p>
					<div className={classes.WordsWrapper}>
						{isWordsLoading ? <h3>Идет загрузка... </h3> : renderWords()}
					</div>
					<div className={classes.WpmWrapper}>
						<p>Words per Minute (WPM): {formattedWpm}</p>
					</div>
				</div>
				<select
					value={testDuration}
					onChange={selectorHandler}
					className={classes.Select}
					// style={{ position: "absolute", top: "15px" }}
				>
					<option>Выберите время теста</option>
					<option value={5}>5</option>
					<option value={15}>15</option>
					<option value={30}>30</option>
					<option value={60}>60</option>
					<option value={120}>120</option>
				</select>
				<textarea
					rows={1}
					type="text"
					ref={inputRef}
					value={inputText}
					onChange={handleInputChange}
					className={classes.TextArea}
				/>
				<div className={classes.Keyboard}>
					<Keyboard highlightKey={highlight}></Keyboard>
						<img className={classes.img} src="/hands4.png" />
				</div>
			</div>
		</>
	);
};
// export default TypingTest;
