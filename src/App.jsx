/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import TestPage from "./pages/testPage/TestPage";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import { AuthContext } from "./components/context";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("auth")) {
			setIsAuth(true);
		}
	}, []);

	console.log(isAuth)

	return (
		<AuthContext.Provider value={{isAuth, setIsAuth, isLoading, setIsLoading}}>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
