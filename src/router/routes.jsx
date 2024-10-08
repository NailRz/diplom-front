import TestPage from "../pages/testPage/TestPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import { RegisratonPage } from "../pages/auth_registration/RegisratonPage";
import { LoginPage } from "../pages/auth_registration/LoginPage";
import { Navigate } from "react-router-dom";
import Feedback from "../pages/FeedbackPage/Feedback";

const routes = (isAuth) => [
	{
		path: "/",
		element: <TestPage />,
		exact: true,
	},
	{
		path: "/profile",
		element: isAuth ?  <ProfilePage /> : <Navigate to="/" />,
		exact: true,
	},
	{
		path: "/registration",
		element: !isAuth ? <RegisratonPage />: <Navigate to="/" />,
		exact: true,
	},
	{
		path: "/login",
		element: !isAuth ? <LoginPage /> : <Navigate to="/" />,
		exact: true,
	},
	{
		path: "/feedback",
		element:   <Feedback />  ,
		exact: true,
	},
];

export default routes;
