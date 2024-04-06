import { Link } from 'react-router-dom';
import classes from './Navbar.module.css'
const Navbar = () => {
    return (
        <div className = {classes.NavbarWrapper}>
            <Link to = '/profile'>Profile</Link>
        </div>
    );
};

export default Navbar;