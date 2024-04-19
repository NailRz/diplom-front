import { useEffect, useState } from "react";
import { getLastTenResults } from "../../API/ServiceFetch";
import classes from "./ProfilePage.module.css";
import ResultTable from "../../components/UI/ResultTable/Result";

const ProfilePage = () => {
	const getLastTResults = async () => {
		try {
			const response = await getLastTenResults();
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Ошибка при получении данных");
			}
			const data = await response.json();
			setResults(data);
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const [results, setResults] = useState([]);
	useEffect(() => {
		getLastTResults();
	}, []);

	return (
		<div>
			<div className={classes.Details}>
				<div className={classes.ProfileName}>profileName</div>
				<div className={classes.TestStarted}>testStarted</div>
				<div className={classes.TestCompleted}>testCompleted</div>
				<div className={classes.TypingTime}>typingTime</div>
			</div>
			<div className={classes.Results}>
				<div className={classes.Seconds}>15sec</div>
				<div className={classes.Seconds}>30sec</div>
				<div className={classes.Seconds}>60sec</div>
				<div className={classes.Seconds}>120sec</div>
			</div>
			<div className={classes.Graphics}>graphics</div>
			<div className={classes.ResultsTable}>
				<ResultTable results={results} />
			</div>
		</div>
	);
};

export default ProfilePage;
