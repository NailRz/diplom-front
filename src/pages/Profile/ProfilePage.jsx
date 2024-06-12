import { useEffect, useState } from "react";
import {
	getAllResults,
	getLastTenResults,
	getTopWpm,
	getUserInfo,
} from "../../API/ServiceFetch";
import classes from "./ProfilePage.module.css";
import ResultTable from "../../components/UI/ResultTable/ResultTable";
import ResultChart from "../../components/UI/Chart/ResultChart";
import ChartAllTime from "../../components/UI/Chart/ChartAllTime/ChartAllTime";
import KbMap from "../../components/UI/Keyboard/KbMap";

const ProfilePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [res, setAllRes] = useState();
	const [userInfo, setUserInfo] = useState();
	const [createdAt, setCreatedAt] = useState();
	const [wpm, setWpm] = useState();
	const [errors, setErrors] = useState();
	const [flag, setFlag] = useState(0);

	const getLastTResults = async () => {
		try {
			const response = await getLastTenResults();
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Ошибка при получении данных");
			}
			const data = await response.json();
			setResults(data);
			const allMistakes = data.flatMap((data) => data.mistakes);
			setErrors(allMistakes);
			return data;
		} catch (error) {
			console.error("Error:", error.message);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const getUserInformation = async () => {
		try {
			const response = await getUserInfo();
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Ошибка при получении данных");
			}
			const data = await response.json();
			setUserInfo(data);
			setCreatedAt(data.createdAt.split("T")[0]);
			return data;
		} catch (error) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getBestWpm = async () => {
		try {
			const response = await getTopWpm();
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Ошибка при получении данных");
			}
			const data = await response.json();
			setWpm(data);
			return data;
		} catch (error) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getAllRes = async () => {
		try {
			const response = await getAllResults();
			if (!response.ok) {
				const errorData = await response.json();
				alert(errorData.message);
				throw new Error(errorData.message || "Ошибка при получении данных");
			}
			const data = await response.json();
			setAllRes(data);
			setFlag(1);
			return data;
		} catch (error) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await getLastTResults();
			await getUserInformation();
			await getBestWpm();
			await getAllRes();
		};
		fetchData();
	}, []);

	const convertSeconds = (sec) => {
		return sec;
	};

	const result = results[0];
	const lastTestWpm = result ? result.calculatedWpm : 0;
	const accuracy = result ? result.calculatedAccuracy : 0;

	return (
		<div className={classes.ProfilePageWrapper}>
			<div className={classes.Details}>
				<div>
					<img
						className={classes.ProfileImage}
						src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
					/>
					<div className={classes.ProfileName}>
						{userInfo ? userInfo.email : "Идет загрузка..."}
					</div>
					<div className={classes.Joined}>
						{userInfo ? createdAt : "Идет загрузка..."}
					</div>
				</div>
				{isLoading ? (
					<h1>Идет загрузка...</h1>
				) : (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							fontSize: "15px",
						}}
					>
						<div>Лучшие результаты</div>
						<div className={classes.Results}>
							{wpm &&
								wpm.map((item) => (
									<div
										key={item.time}
										className={classes.Seconds}
										style={{
											display: "flex",
											alignItems: "center",
											flexDirection: "column",
											margin: "10px",
										}}
									>
										<span>{convertSeconds(item.time)} sec</span>
										<span>{item.maxWpm ? item.maxWpm : "-"} wpm </span>
									</div>
								))}
						</div>
					</div>
				)}
			</div>

			<div className={classes.Charts}>
				<div style={{ flexDirection: "column" }}>
					<h1>Последний завершенный тест</h1>
					<h2> Time: {localStorage.getItem("testDuration")}</h2>
					<h2> Words per Minute: {lastTestWpm}</h2>
					<h2> Accuracy: {accuracy}%</h2>
				</div>
				<ResultChart result={result} />
			</div>

			<div>
				<h1>Тепловая карта ошибок</h1>
				<h3>
					Обратите внимание на более темные зоны, в них Вы допускаете больше
					ошибок
				</h3>
				<KbMap errors={errors} />
			</div>

			<div className={classes.Charts}>
				<h1>Все завершенные тесты</h1>
				{flag ? <ChartAllTime dataArray={res} /> : <h1>Идет загрузка...</h1>}
			</div>

			<div className={classes.ResultsTable}>
				<h1>Результаты</h1>
				<ResultTable results={results} />
			</div>
		</div>
	);
};

export default ProfilePage;
