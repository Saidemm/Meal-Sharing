import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/meal-sharing.png';
import "./mealComponentStyle.css";


function Nav() {
    return (
        <div className="banner">
            <div className="logoContainer">
                <img src={logo} ></img>
            </div>
            <div className="navContainer">
                <nav>
                    <ul className="navList">
                        <Link to='/'>
                            <li>Home</li>
                        </Link>
                        <Link to='/meals'>
                            <li>Our-Meals</li>
                        </Link>
                        <Link to='/about'>
                            <li>About</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>

    );
}

export default Nav;