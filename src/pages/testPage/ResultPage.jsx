/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import {
	selectEndTime,
	selectInputArray,
	selectInputText,
	selectMistakesArray,
	selectRawWpmArray,
	selectStartTime,
	selectWords,
	selectWpmArray,
} from "../../features/testData/testDataSlice";
import useWpmCalculator from "../../components/hooks/useWpm";
import {
	selectIsTestComplete,
	selectIsTestInvalid,
	updateIsTestInvalid,
} from "../../features/testStatesSlice/testStatesSlice";
import useAccuracyCalculator from "../../components/hooks/useAccuracy";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import classes from "./ResultPage.module.css";
import ResultChart from "../../components/UI/Chart/ResultChart";

const ResultPage = () => {
	const dispatch = useDispatch();
	const startTime = useSelector(selectStartTime);
	const endTime = useSelector(selectEndTime);
	const inputText = useSelector(selectInputText);
	const words = useSelector(selectWords);
	const isTestComplete = useSelector(selectIsTestComplete);
	const isTestInvalid = useSelector(selectIsTestInvalid);

	const correctWordsArray = useSelector(selectWords);
	const inputArray = useSelector(selectInputArray);
	const mistakesArray = useSelector(selectMistakesArray);
	const wpmArray = useSelector(selectWpmArray);
	const rawWpmArray = useSelector(selectRawWpmArray);
	const { accuracy, isLoading } = useAccuracyCalculator(inputText, words);
	const time = localStorage.getItem("testDuration");

	const formattedWpmArray = wpmArray.map((wpm) => wpm.toFixed(2));
	const formattedRawWpmArray = rawWpmArray.map((wpm) => wpm.toFixed(2));

	const trueWpm = useWpmCalculator(
		startTime,
		endTime,
		inputText,
		words,
		isTestComplete
	);

	let formattedWpm = Number.isFinite(trueWpm)
		? trueWpm.toFixed(2)
		: "Calculating...";

	const sendResults = async (correctWordsArray, inputArray, mistakesArray) => {
		try {
			if (!localStorage.getItem("token")) {
				throw new Error("Unauthorized");
			}
			const response = await fetch("http://localhost:5000/results", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage
						.getItem("token")
						.replace(/['"]+/g, "")}`,
				},
				body: JSON.stringify({
					time: time,
					calculatedWpm: formattedWpm,
					calculatedAccuracy: accuracy,
					enteredWords: inputArray,
					mistakes: mistakesArray,
					// accuracy: accuracy,
					wpmArray: formattedWpmArray,
					rawWpmArray: formattedRawWpmArray,
					correctWords: correctWordsArray,
				}),
			});
			if (!response.ok) {
				console.log(response);
				throw new Error(response.statusText);
			}

			console.log(response);
		} catch (error) {
			throw new Error(error);
		}
	};

	let push = false;
	useEffect(() => {
		if (!isTestInvalid && rawWpmArray.length > 0 && formattedWpm > 0 && !push) {
			sendResults(
				correctWordsArray,
				inputArray,
				mistakesArray,
				wpmArray,
				rawWpmArray
			);
			push = true;
		}
	}, [formattedWpm]);

	const sendHandler = () => {
		sendResults(correctWordsArray, inputArray, mistakesArray);
	};

	useEffect(() => {
		if (!isLoading && accuracy <= 0) {
			dispatch(updateIsTestInvalid(true));
		}
	}, [accuracy, dispatch, isLoading]);

	const [result, setResult] = useState([]);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (
			(time && formattedWpmArray?.length > 0,
			formattedRawWpmArray?.length > 0,
			mistakesArray?.length > 0)
		) {
			setIsReady(true);
			setResult((prevResult) => [
				...prevResult,
				{
					time: Number(time),
					wpmArray: formattedWpmArray,
					rawWpmArray: formattedRawWpmArray,
					mistakes: mistakesArray,
				},
			]);
		}
	}, []);

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className={classes.ResultPage}>
					{isTestInvalid ? (
						<h2>Вы не ввели ни одного правильного символа</h2>
					) : (
						<div>
							<div className={classes.ResultText}>
								<h1>Your results: </h1>
								<h2> Time: {localStorage.getItem("testDuration")}</h2>
								<h2> Words per Minute: {formattedWpm}</h2>
								<h2> Accuracy: {accuracy}%</h2>
								<button onClick={sendHandler}> Отправить </button>
							</div>
						</div>
					)}
					<div className={classes.Chart}>
						{isReady && <ResultChart result={result[0]} />}
					</div>
				</div>
			)}
		</div>
	);
};

export default ResultPage;
