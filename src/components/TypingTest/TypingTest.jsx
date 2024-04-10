/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useMemo } from "react";
import useWpmCalculator from "../hooks/useWpm.jsx";
import classes from "./TypingTest.module.css";
import { useNavigate } from "react-router-dom";
import ResultPage from "../../pages/testPage/ResultPage.jsx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
	selectEndTime,
	selectInputText,
	selectStartTime,
	selectWords,
	updateEndTime,
	updateInputText,
	updateStartTime,
	updateTime,
	updateWords,
	updateWpm,
} from "../../features/testData/testDataSlice.js";
import {
	selectIsTestComplete,
	updateIsTestComplete,
} from "../../features/testStatesSlice/testStatesSlice.js";
import UpdateHandler from "../UpdateHandler.jsx";
import testAccuracy from "../testAccuracy.jsx";
import getWordErrorIndex from "../addErrorToArray.jsx";
import addErrorToArray from "../addErrorToArray.jsx";

const TypingTest = ({ wordsProp, isWordsLoading }) => {
	const dispatch = useDispatch();
	// const [inputText, setInputText] = useState("");
	// const [words, setWords] = useState([]);
	const words = useSelector(selectWords);
	const inputText = useSelector(selectInputText);

	const inputRef = useRef(null);
	const caretRef = useRef();
	const wordRef = useRef();
	// const [startTime, setStartTime] = useState(0);
	// const [endTime, setEndTime] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [isTestStarted, setIsTestStarted] = useState(false);
	const [isTestCompleted, setIsTestCompleted] = useState(false);
	const isTestComplete = useSelector(selectIsTestComplete);
	const startTime = useSelector(selectStartTime);
	const endTime = useSelector(selectEndTime);
	const [isTestInvalid, setIsTestInvalid] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60);
	const [isTyping, setIsTyping] = useState(false);
	const [uncorrectCharacters, setUncorrectCharacters] = useState(0);
	const [errorArray, setErrorArray] = useState([]);
	const wpm = useWpmCalculator(
		startTime,
		endTime,
		inputText,
		words,
		isTestComplete
	);
	useEffect(() => {
		dispatch(updateWpm(wpm));
	}, [isTestComplete, endTime, dispatch, wpm]);
	let formattedWpm = Number.isFinite(wpm) ? wpm.toFixed(0) : "Calculating...";

	const [saveTime, setSaveTime] = useState(-1);
	if (timeLeft > saveTime) {
		console.log("New maximum timeLeft:", timeLeft);
		setSaveTime(timeLeft);
		dispatch(updateTime(timeLeft));
	}

	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (isTestComplete){
	// 		handleInputChange()
	// 	}
	// },[isTestComplete])

	useEffect(() => {
		// setWords(wordsProp ? wordsProp : []);
		dispatch(updateWords(wordsProp ? wordsProp : []));
	}, [wordsProp]);

	const startTest = () => {
		if (inputText.length === 0 && !isTestComplete) {
			dispatch(updateStartTime(Date.now()));
			console.log(startTime, "starttime");
			setIsTestStarted(true);
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		console.log(startTime, endTime);
	}, [startTime, endTime]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isTyping) {
				startTest();
				// setTimeLeft(5);
				// dispatch(updateEndTime(Date.now()))
				setIsTyping(true);
				console.log("handleKeyDown");
				// saveTime = timeLeft;
				// console.log("sava", saveTime);
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
				dispatch(updateEndTime(Date.now()));
			}, 1000);
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
	}, [timeLeft, isTestComplete, isTestStarted, dispatch]);

	useEffect(() => {
		if (timeLeft === 0) {
			dispatch(updateEndTime(Date.now()));
			console.log(Date.now());

			dispatch(updateWpm(wpm));
			// UpdateHandler(inputText,words)
			dispatch(updateIsTestComplete(true));
		}
	}, [dispatch, formattedWpm, isTestComplete, timeLeft, wpm]);

	// useEffect(()=>{
	// 	UpdateHandler(inputText,words)
	// },[inputText, isTestComplete, words])
	// const caretRef = useRef(null);
	// console.log(caretRef, "ВЫСОТА КАРЕТКИ");

	// useEffect(() => {
	// 	if (caretRef.current) {
	// 		const height = caretRef.current.offsetHeight;
	// 		console.log(height, "ВЫСОТА КАРЕТКИ");
	// 	}
	// }, []);

	// const [caretRect, setCaretRect] = useState()
	// if (caretRef) {
	// 	const mama = caretRef.current.getBoundingClientRect()
	// 	setCaretRect(mama)
	// // }
	// const [rowCount, setRowCount] = useState(0);
	// const [caretHeight, setCaretHeight] = useState(-1);
	const [translateY, setTranslateY] = useState(0);
	const [rowFlag, setRowFlag] = useState(0);
	const [rowFlag2, setRowFlag2] = useState(0);

	const [caretHeight, setCaretHeight] = useState(0);
	const [prevCaretHeight, setPrevCaretHeight] = useState(0);
	const [rowCount, setRowCount] = useState(0);
	const rowThreshold = 36.5; // высота одной строки

	useEffect(() => {
		if (caretHeight != prevCaretHeight) {
			rowFlag2 ? setRowFlag((prev) => !prev) : setRowFlag2((prev) => !prev)
			if (rowFlag)
			{caretHeight > prevCaretHeight ? setRowCount((prev) => prev + 1) : setRowCount ((prev) => prev - 1)}

		}
		setPrevCaretHeight(caretHeight)
	}, [caretHeight, prevCaretHeight, rowFlag, rowFlag2]);
	// useEffect(() => {
	// 	if (rowFlag) {
	// 	}
	// }, [rowFlag]);

	const handleInputChange = (e) => {
		const userInput = e.target.value;
		if (userInput) {
			const caretRect = caretRef.current.getBoundingClientRect().y.toFixed(0);
			setCaretHeight(caretRect);
		}

		dispatch(updateInputText(userInput));
		dispatch(updateEndTime(Date.now()));

		// testAccuracy(inputText,words)

		if (userInput.trim().split(/\s+/).length > 0) {
			setWordCount(userInput.trim().split(/\s+/).length);
		}

		if (userInput.length === words.length) {
			// setEndTime(Date.now());
			// dispatch(updateIsTestComplete(true));
		} else {
			// setEndTime(0);
			dispatch(updateIsTestComplete(false));
		}
		setErrorArray(addErrorToArray(inputText, words, errorArray));
	};
	console.log(rowCount, "rowcount");
	const renderWords = () => {
		const inputArray = inputText.split(/\s+/);
		return words.map((word, wordIndex) => {
			let wordLetters = word.split("");
			let enteredWord = inputArray[wordIndex] || "";
			return (
				// <div key>
				<div
					key={wordIndex}
					// ref={wordRef}
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
							ref={caretRef}
							style={{
								position: "absolute",
								left: enteredWord.length * 13.75 + "px",
								height: "100%",
								width: "2px",
								// backgroundColor: 'black',
							}}
						/>
					)}
					{/* {wordIndex === inputArray.length - 1 && caretRef.current && (
          <div>{console.log(x, 'ВЫСОТА МАТЬ ВАШУ')}</div> // отображаем высоту текущего элемента каретки
        )} */}
				</div>
				// </div>
			);
		});
	};

	const selectorHandler = (event) => {
		setTimeLeft(event.target.value);
		dispatch(updateTime(event.target.value));
		console.log(event.target.value);
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
					<p>Words per Minute (WPM): {formattedWpm}</p>
				</div>
				<select
					value={timeLeft}
					onChange={selectorHandler}
					// defaultValue={'Выберете время'}
					style={{ position: "absolute", top: "15px" }}
				>
					<option value="">Выберите значение</option>
					<option value={5}>5</option>
					<option value={15}>15</option>
					<option value={30}>30</option>
					<option value={60}>60</option>
				</select>
				<textarea
					rows={1}
					type="text"
					ref={inputRef}
					value={inputText}
					onChange={handleInputChange}
					style={{
						fontSize: "25px",
						fontFamily: "monospace",
						padding: "5px",
						// width: "1px",
						// height: "1px",
						position: "absolute",
						top: "220px",
						left: "20px",
						// top: "-100px",
						// left: "-100px",
						// opacity: 0,
						overflow: "hidden",
						width: "915px",
						// whiteSpace:'pre-wrap',
						resize: "none",
					}}
				/>
			</div>
		</>
	);
};
export default TypingTest;
