/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import TestPage from "./pages/testPage/TestPage";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	
	
	useEffect(() => {
		if (localStorage.getItem("auth")) {
			setIsAuth(true);
		}
	}, []);

	return (
		<BrowserRouter>
			<Navbar/>
			<AppRouter />
		</BrowserRouter>
	);
}

export default App;
