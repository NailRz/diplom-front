import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar--wrapper'>
            <Link to = '/profile'>Profile</Link>
        </div>
    );
};

export default Navbar;