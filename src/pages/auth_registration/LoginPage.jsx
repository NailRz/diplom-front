import { useContext } from "react";
import classes from "./login_registration.module.css";
import { AuthContext } from "../../components/context";
export const LoginPage = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    console.log(isAuth);
	const login = async (email, password) => {
		try {
			const response = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
            if (!response.ok) {
                console.log(response)
				throw new Error(response.statusText);
			}

			setIsAuth(true);
			const token = await response.json();
			console.log(token);
			localStorage.setItem("token", JSON.stringify(token.token));
			console.log(token.token);
			console.log(localStorage.getItem("token") === JSON.stringify(token.token));
			console.log(localStorage.getItem("token") );
			localStorage.setItem("auth", true);
			console.log('da')
		} catch (error) {
			throw new Error(error);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		// console.log({ email, password });
		login(email, password);
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
			</form>
		</div>
	);
};
