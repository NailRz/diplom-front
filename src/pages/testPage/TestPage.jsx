/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TypingTest } from "../../components/TypingTest/TypingTest";
import ResultPage from "./ResultPage";
import Service from "../../API/Service";
import { useFetching } from "../../components/hooks/useFetching";
import {
	selectIsTestComplete,
	selectIsTyping,
	updateIsTyping,
	updateIsTestComplete,
} from "../../features/testStatesSlice/testStatesSlice";
import store from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectWpm } from "../../features/testData/testDataSlice";
import classes from "./TestPage.module.css";

const TestPage = () => {
	const dispatch = useDispatch();
	const isTyping = useSelector(selectIsTyping);
	// const finalTime = useSelector(changeTime)
	// console.log(finalTime)
	const finalWpm = useSelector(selectWpm);
	const [wordsArr, setWordsArr] = useState(null);
	const isTestComplete = useSelector(selectIsTestComplete);
	

	const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
		const response = await Service.getAll();
		console.log(response.data);
		if (wordsError) console.log(wordsError);
		// const arr = [];
		// for (let i = 0; i < response.data.length; i++) {
		// 	arr.push(response.data[i].words);
		// }
		// console.log(arr);

		setWordsArr(response.data);
	});

	useEffect(() => {
		fetchWords();
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.code === "Tab") {
				dispatch(updateIsTestComplete(false));
				e.preventDefault();
				window.location.reload();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [dispatch, isTyping]);

	return (
		<div className={classes.TestPage}>
			{/* <button onClick={() => navigate(`/results`)}></button> */}
			{isTestComplete ? (
				<ResultPage time={5} wpm={finalWpm} />
			) : (
				<TypingTest wordsProp={wordsArr} isWordsLoading={isWordsLoading} />
			)}
			<div
				style={{
					textAlign: "center",
					bottom: "80px",
					position: "absolute",
				}}
			>
				Press Tab to restart test.
			</div>
		</div>
	);
};

export default TestPage;