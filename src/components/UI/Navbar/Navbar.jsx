import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context";

const Navbar = () => {
	const { isAuth, setIsAuth, isLoading } = useContext(AuthContext);

	if (!isAuth && !isLoading) {
		localStorage.removeItem("auth");
		localStorage.removeItem("token");
	}
	const logout = () => {
		localStorage.removeItem("auth");
		setIsAuth(false);
	};
	return (
		<div className={classes.NavbarWrapper}>
			<Link className={classes.TestLink} to="/">Test</Link>
			{isAuth && <Link to="/profile">Profile</Link>}
			{!isAuth && <Link to="/login">Login</Link>}
			{isAuth && <button onClick={logout}>Logout</button>}
		</div>
	);
};

export default Navbar;
