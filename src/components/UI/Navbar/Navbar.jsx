import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context";

const Navbar = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem("auth");
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
