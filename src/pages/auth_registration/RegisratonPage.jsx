import { useContext} from "react";
import classes from "./login_registration.module.css";
import { AuthContext } from "../../components/context";
import { registration } from "../../API/ServiceFetch";
import { Link } from "react-router-dom";

export const RegisratonPage = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	console.log(isAuth);
	const onSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		const confirmPassword = e.target[2].value;
		console.log(email);
		console.log(password);
		console.log(confirmPassword);
		if (password !== confirmPassword) {
			alert("Пароли не совпадают");
			return;
		}
		try {
			const response = await registration(email, password);
			if (!response.ok) {
				console.log(response);
				throw new Error(response.status + " " + response.statusText + "\nПользователь уже существует");
			}

			const token = await response.json();
			setIsAuth(true);
			localStorage.setItem("token", JSON.stringify(token.token));
			localStorage.setItem("auth", true);
		} catch (error) {
			alert(error.message);
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit} className={classes.AuthForm}>
				<h2>Регистрация</h2>
				<label htmlFor="email">Email</label>
				<input type="email" placeholder="example@gmail.com" required />
				<label htmlFor="email">Пароль</label>
				<input type="password" placeholder="Введите пароль" required />
				<label htmlFor="email">Повторите пароль</label>
				<input type="password" placeholder="Повторите пароль" required />
				<button type="submit">Зарегистрироваться</button>
				<a>
					Уже есть аккаунт? <Link className={classes.TestLink} to="/login">Авторизация</Link>
				</a>
			</form>
		</div>
	);
};
