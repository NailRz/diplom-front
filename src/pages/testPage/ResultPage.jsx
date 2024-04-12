/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import {
	selectEndTime,
	selectInputText,
	selectStartTime,
	selectTime,
	selectWords,
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

const ResultPage = () => {
	const dispatch = useDispatch();
	const startTime = useSelector(selectStartTime);
	const endTime = useSelector(selectEndTime);
	const inputText = useSelector(selectInputText);
	const words = useSelector(selectWords);
	const isTestComplete = useSelector(selectIsTestComplete);
	const time = useSelector(selectTime);
	const isTestInvalid = useSelector(selectIsTestInvalid);
	// const [isTestInvalid, setIsTestInvalid] = useState(false);
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

	const { accuracy, isLoading } = useAccuracyCalculator(inputText, words);
	useEffect(() => {
		if (!isLoading && accuracy <= 0) {
			dispatch(updateIsTestInvalid(true));
		}
	}, [accuracy, dispatch, isLoading]);

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<h1>Your results: </h1>
					{isTestInvalid ? (
						<h2>Тест не засчитан</h2>
					) : (
						<>
							<h2> Time: {time}</h2>
							<h2> Words per Minute: {formattedWpm}</h2>
							<h2> Accuracy: {accuracy.toFixed(2)}%</h2>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default ResultPage;
