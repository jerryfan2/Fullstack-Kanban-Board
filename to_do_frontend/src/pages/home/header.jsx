import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import OrekiPFP from "../../assets/oreki_pfp.jpg";

import instagramIcon from "../../assets/instagram.svg";
import facebookIcon from "../../assets/facebook.svg";
import linkedInIcon from "../../assets/linkedIn.svg";
import githubIcon from "../../assets/github.svg";

import { UserContext } from "../../App.jsx";

import { LOGOUT_USER } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Header() {
    const [logoutUser] = useMutation(LOGOUT_USER);

    const { user, setUser } = useContext(UserContext);
    const loggedIn = user !== undefined;

    const onClickLogOut = () => {
        logoutUser();
        window.location.reload();
    }

    return (
    <header>
        <div className="left-header">
            <Link to="/">
                <img className="pfp-img" src={OrekiPFP} alt="Profile Picture"/>
            </Link>
            <div className="welcome-texts">
                <div className="greeting-text">Hi there,</div>
                <div className="name-text">{loggedIn ? `Welcome, ${user}!` : "I'm Jerry!"}</div>
            </div>
        </div>
        <div></div>
        <div className="right-header">
            {loggedIn ?
                <div className="login-signup-section">
                    <button onClick={onClickLogOut}>Logout</button>
                </div> :
            <div className="login-signup-section">
                <Link to="/user/login">
                    <button>Login</button>
                </Link>
                <Link to="/user/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
            }
            <div className="socials-section">
                <a href="https://www.instagram.com/jerry_fan2/" target="_blank">
                    <img src={instagramIcon} alt="Instagram"/>
                </a>
                <a href="https://www.facebook.com/jerry.fan.5661/" target="_blank">
                    <img src={facebookIcon} alt="Facebook"/>
                </a>
                <a href="https://www.linkedin.com/in/jerry-fan-0959b0b2/" target="_blank">
                    <img src={linkedInIcon} alt="LinkedIn"/>
                </a>
                <a href="https://github.com/jerryfan2" target="_blank">
                    <img src={githubIcon} alt="Github"/>
                </a>
            </div>
        </div>
    </header>
    );
}

export default Header;