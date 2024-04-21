/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { TypingTest } from "../../components/TypingTest/TypingTest";
import ResultPage from "./ResultPage";
import { useFetching } from "../../components/hooks/useFetching";
import {
	selectIsTestComplete,
	selectIsTyping,
	updateIsTyping,
	updateIsTestComplete,
	resetStates,
} from "../../features/testStatesSlice/testStatesSlice";
import store from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { resetData, selectWpm } from "../../features/testData/testDataSlice";
import classes from "./TestPage.module.css";
import { getWords } from "../../API/ServiceFetch";
import { AuthContext } from "../../components/context";

const TestPage = () => {
	const {isAuth} = useContext(AuthContext);
	const dispatch = useDispatch();
	const isTyping = useSelector(selectIsTyping);
	// const finalTime = useSelector(changeTime)
	// console.log(finalTime)
	const finalWpm = useSelector(selectWpm);
	const [wordsArr, setWordsArr] = useState(null);
	const isTestComplete = useSelector(selectIsTestComplete);
	const [isRestart, setIsRestart] = useState(false);
	const [refreshWords, setRefreshWords] = useState(false);
	const [isWordsLoading, setIsWordsLoading] = useState(true);
	const fetchWords = async () => {
		console.log(isAuth);
		const response = await getWords(isAuth);

		console.log(response);
		setWordsArr(response);
		setIsWordsLoading(false);
	};

	useEffect(() => {
		fetchWords();
	}, [refreshWords]);

	const restartTest = () => {
		setIsRestart(true);
		dispatch(resetData());
		dispatch(resetStates());
		setIsWordsLoading(true);
		setRefreshWords((prev) => !prev);
		setTimeout(() => {
			setIsRestart(false);
		});
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.code === "Tab") {
				restartTest();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isTyping]);

	return (
		<div className={classes.TestPage}>
			{/* <button onClick={() => navigate(`/results`)}></button> */}
			{isTestComplete ? (
				<ResultPage time={5} wpm={finalWpm} />
			) : (
				!isRestart && (
					<TypingTest wordsProp={wordsArr} isWordsLoading={isWordsLoading} />
				)
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
			{/* <button onClick={restartTest}>Restart</button> */}
		</div>
	);
};

export default TestPage;
