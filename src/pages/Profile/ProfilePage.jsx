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
			const allMistakes = data.flatMap((data) => data.mistakes);
			setErrors(allMistakes)
			console.log(allMistakes);
			return data;
		} catch (error) {
			console.error("Error:", error.message);
			throw error;
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
			console.log(data);
			setUserInfo(data);
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
			console.log(data);
			// setUserInfo(data);
			setWpm(data);
			console.log(data);
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
			console.log(data);
			// setUserInfo(data);
			setAllRes(data);
			console.log(res);
			return data;
		} catch (error) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const [results, setResults] = useState([]);
	const result = results[0];
	const [res, setAllRes] = useState();
	const [userInfo, setUserInfo] = useState();
	const [createdAt, setCreatedAt] = useState();
	const [wpm, setWpm] = useState();
	const [errors, setErrors] = useState();
	useEffect(() => {
		if (userInfo) {
			setCreatedAt(userInfo.createdAt.split("T")[0]);
		}
	}, [userInfo]);

	// console.log(result);
	useEffect(() => {
		getLastTResults();
		getUserInformation();
		getBestWpm();
		getAllRes();
	}, []);

	let [flag, setFlag] = useState(0);

	useEffect(() => {
		console.log(res);
		if (res !== undefined) {
			// setAllRes(res);
			setFlag(1);
		}
	}, [res]);
	const convertSeconds = (sec) => {
		// let min = Math.floor(sec / 60);
		let remainingSec = sec;
		// if(remainingSec < 10) remainingSec = '0' + remainingSec;
		// if(min < 10) min = '0' + min;
		return remainingSec;
	};
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
						{/* <div className={classes.Seconds}>15sec</div>
					<div className={classes.Seconds}>30sec</div>
					<div className={classes.Seconds}>60sec</div>
					<div className={classes.Seconds}>120sec</div> */}
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
				<h1/>

			</div>

			<div className={classes.Charts}>
				<h1>Последний завершенный тест</h1>
				<ResultChart result={result} />
			</div>
			<div>
				<h1>Тепловая карта ошибок</h1>
				<h3>Обратите внимание на более темные зоны, в них Вы допускаете больше ошибок</h3>
				<KbMap errors={errors} />
				<h1/>
			</div>

			<div className={classes.Charts}>
				<h1>Все завершенные тесты</h1>
				{flag && <ChartAllTime dataArray={res} />}
			</div>

			<div className={classes.ResultsTable}>
				<h1>Результаты</h1>
				<ResultTable results={results} />
			</div>
			
		</div>
	);
};

export default ProfilePage;
