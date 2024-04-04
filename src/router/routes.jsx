import TestPage from "../pages/testPage/TestPage";
import ProfilePage from "../pages/Profile/ProfilePage";

const routes = () => 	[
		{
			path: "/",
            element: <TestPage/>,
			exact: true,
		},
        // {
        //     path: "/result",
        //     element: <ResultPage wpm = {'mamapapas'}/>,
        //     exact: true
        // },
        {
            path: "/profile",
            element: <ProfilePage/>,
            exact: true
        }

	];

export default routes;