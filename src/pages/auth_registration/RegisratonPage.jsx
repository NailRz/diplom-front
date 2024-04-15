import { useContext} from "react";
import classes from "./login_registration.module.css";
import { AuthContext } from "../../components/context";
import { registration } from "../../API/ServiceFetch";

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
				<h2>Registration</h2>
				<label htmlFor="email">Email</label>
				<input type="email" placeholder="example@gmail.com" required />
				<label htmlFor="email">Password</label>
				<input type="password" placeholder="Enter your password" required />
				<label htmlFor="email">Confirm password</label>
				<input type="password" placeholder="Repeat your password" required />
				<button type="submit">Register</button>
			</form>
		</div>
	);
};
