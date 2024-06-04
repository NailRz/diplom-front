import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { FiLogOut } from "react-icons/fi";
import { GoPerson, GoX } from "react-icons/go";
import { VscFeedback } from "react-icons/vsc";

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
      <Link className={classes.TestLink} to="/">
        <GoX style={{ position: "relative", top: "4px" }} size={17} /> Test
      </Link>
     
      <div className={classes.NavbarButtons}>
        {isAuth && (
          <>
            <Link  to="/feedback">
            <VscFeedback size={13} style={{ position: "relative", top: "2px" }}/> Feedback
            </Link>
            <Link to="/profile" className={classes.ProfileButton}>
              <GoPerson size={13} style={{ position: "relative", top: "2px" }} /> Profile
            </Link>
            <button onClick={logout}>
              Logout <FiLogOut style={{ position: "relative", top: "2px" }} size={13} />
            </button>
          </>
        )}
        {!isAuth && <Link to="/login">Login</Link>}
      </div>
    </div>
	);
};

export default Navbar;
