/* eslint-disable no-unused-vars */
import { useContext } from "react";
import routes from "../router/routes";
import {useRoutes} from 'react-router-dom'
import { AuthContext } from "./context";

const AppRouter = () => {
	const authContext = useContext(AuthContext);
	const isAuth = authContext ? authContext.isAuth : null;

	const routing = useRoutes(routes(isAuth));

	return <>{routing}</>;
};

export default AppRouter;
    