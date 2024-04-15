import { useContext } from "react";
import classes from "./login_registration.module.css";
import { AuthContext } from "../../components/context";
import { login } from "../../API/ServiceFetch";

export const LoginPage = () => {
	const { setIsAuth } = useContext(AuthContext);

	const onSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		try {
			const response = await login(email, password);
			if (!response.ok) {
				console.log(response);
				throw new Error(response.status + " " + response.statusText + "\nНеверный логин или пароль" );
			}

			setIsAuth(true);

			const token = await response.json();
			localStorage.setItem("token", JSON.stringify(token.token));
			localStorage.setItem("auth", true);
		} catch (error) {
			alert(error.message);
		}
	};
	return (
		<div>
			<form className={classes.AuthForm} onSubmit={onSubmit}>
				<h2>Login</h2>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="example@gmail.com"
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Enter your password"
					required
				/>
				<button type="submit">Login</button>
				<a>
					Don&apos;t have an account? <a href="/registration">Registration</a>
				</a>
			</form>
		</div>
	);
};
