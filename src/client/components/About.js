import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faEnvelope, faPhone, faMapMarkerAlt, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import hyf from '../assets/images/hyf.png';
import "./mealComponentStyle.css";

function About() {
    return (
        <div className="aboutContainer">
            <div className="aboutContent">
                <b>Meal Sharing</b> ... A Node.js/React App!<br />
                <FontAwesomeIcon icon={faCopyright} />&nbsp;Open Source - Feel free to use it for any purpose
                <hr />
                <ul>
                    <li>
                        Developed by: Saide Moosavi -&nbsp;
                        <a href="https://www.facebook.com/saeedeh.moosavi">
                            <FontAwesomeIcon icon={faFacebook} />&nbsp;
                        </a>
                        &nbsp;&nbsp;
                        <a href="https://linkedin.com/in/saidem/">
                            <FontAwesomeIcon icon={faLinkedin} />&nbsp;
                        </a>
                        &nbsp;&nbsp;
                        <a href="https://github.com/Saidemm">
                            <FontAwesomeIcon icon={faGithub} />&nbsp;
                        </a>
                    </li>
                    <li><br /></li>
                    <li>
                        <a href="mailto:saymahtab@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} />&nbsp;
                            <b>saymahtab</b><FontAwesomeIcon icon={faAt} /><b>gmail.com</b>
                        </a>
                        <br /><br />
                    </li>
                    <li>
                        <a href="tel:70718085">
                            <FontAwesomeIcon icon={faPhone} />&nbsp;
                            <b>+45 70 71 80 85</b>
                        </a>
                        <br /><br />
                    </li>
                    <li>
                        <a href="https://www.google.com/maps/place/Valby">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;
                            Valby
                        </a>
                        <br /><br />
                    </li>
                </ul>
                <hr />
                <img src={hyf} height="50px"></img><br></br>All thanks go to HackYourFuture Group
            </div>
        </div>
    );
}

export default About;