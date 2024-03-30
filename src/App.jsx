import React, { useEffect, useState } from "react";
import "./App.css";
import TestPage from "./pages/TestPage";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	
	
	useEffect(() => {
		if (localStorage.getItem("auth")) {
			setIsAuth(true);
		}
	}, []);

	return (
		<BrowserRouter>
			
			<AppRouter />
		</BrowserRouter>
	);
}

export default App;
