import { useContext } from "react";
import classes from "./login_registration.module.css";
import { AuthContext } from "../../components/context";
export const RegisratonPage = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	console.log(isAuth);
	const registration = async (email, password) => {
		try {
			const response = await fetch("http://localhost:5000/auth/registration", {
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
				throw new Error("Registration failed");
			}

			const token = await response.json();
			console.log(token);
			setIsAuth(true);
			console.log(isAuth);
			localStorage.setItem("token", token);
			localStorage.setItem("auth", true);
		} catch (error) {
            alert('Такой пользователь уже существует');
			throw new Error(error);
		}
	};

	const onSubmit = (e) => {
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
		registration(email, password);
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
