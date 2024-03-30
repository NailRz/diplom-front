import React from "react";
import TypingTest from "../components/TypingTest/TypingTest";
import ResultPage from "../pages/ResultPage";
import TestPage from "../pages/TestPage";

const routes = () => 	[
		{
			path: "/",
            element: <TestPage/>,
			exact: true,
		},
        {
            path: "/result",
            element: <ResultPage/>,
            exact: true
        }
	];

export default routes;