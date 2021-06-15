import React from "react";
import { Link } from 'react-router-dom';


function Nav() {
    // const navStyle = {}

    return (
        // <Router>
            <nav>
                <p>Logo</p>
                <h3>Meal Sharing</h3>
                <ul className="nav-links">
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/About'>
                        <li>About</li>
                    </Link>
                    <Link to='/Meals'>
                        <li>Meals Experiences</li>
                    </Link>
                </ul>
            </nav>
        // </Router>
    );
}

{/* <li>Meals</li>
<li>Reservation</li> */}

export default Nav;