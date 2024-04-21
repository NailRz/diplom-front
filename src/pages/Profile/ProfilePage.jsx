import { useEffect, useState } from "react";
import { getLastTenResults } from "../../API/ServiceFetch";
import classes from "./ProfilePage.module.css";
import ResultTable from "../../components/UI/ResultTable/ResultTable";
import ResultChart from "../../components/UI/Chart/ResultChart";

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
	const result = results[0];
	// console.log(result);
	useEffect(() => {
		getLastTResults();
	}, []);

	return (
		<div className={classes.ProfilePageWrapper}>
			<div className={classes.Details}>
				<div>
					<img
						className={classes.ProfileImage}
						src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
					/>
					<div className={classes.ProfileName}>profileName</div>
					<div className={classes.Joined}>Joined from 2024</div>
				</div>
				<div className={classes.Results}>
					<div className={classes.Seconds}>15sec</div>
					<div className={classes.Seconds}>30sec</div>
					<div className={classes.Seconds}>60sec</div>
					<div className={classes.Seconds}>120sec</div>
				</div>
			</div>

			<div className={classes.Charts}>
				<ResultChart result={result} />
			</div>
			<div className={classes.ResultsTable}>
				<ResultTable results={results} />
			</div>
		</div>
	);
};

export default ProfilePage;
