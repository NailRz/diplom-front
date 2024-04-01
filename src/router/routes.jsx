import React from "react";
import TypingTest from "../components/TypingTest/TypingTest";
import ResultPage from "../pages/testPage/ResultPage";
import TestPage from "../pages/testPage/TestPage";
import ProfilePage from "../pages/Profile/ProfilePage";

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
        },
        {
            path: "/profile",
            element: <ProfilePage/>,
            exact: true
        }

	];

export default routes;