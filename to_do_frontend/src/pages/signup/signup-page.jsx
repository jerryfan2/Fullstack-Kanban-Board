import React, { useState } from 'react';
import "../login/login-page.css"
import { useNavigate } from "react-router-dom"

import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../GraphQL/Mutations";
import { LOGIN_USER } from "../../GraphQL/Mutations";

export default function SignupPage() {
  const [signUpUser] = useMutation(SIGNUP_USER);
  const [loginUser] = useMutation(LOGIN_USER);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [passwordMatches, setPasswordMatches] = useState(true);
  const [userExists, setUserExists] = useState(false);

  const onClickSignUpUser = async () => {
    if (passwordValue !== confirmPasswordValue) {
      setPasswordMatches(false);
      setUserExists(false);
      return;
    }
    const newUser = await signUpUser({
      variables: {
        username: usernameValue,
        password: passwordValue
      }
    });
    if (newUser.data.signUpUser === null) {
      setUserExists(true);
      setPasswordMatches(true);
      return;
    }
    const loginUserData = await loginUser({
      variables: {
        username: usernameValue,
        password: passwordValue
      }
    })
    navigate("/");
    window.location.reload();
  }

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/user/login");
  }

    return (
      <div className="login-container" style={{height: "70vh"}}>
        <div className="welcome-back-title" style={{marginBottom: "3vh"}}>WELCOME!</div>
        {!passwordMatches && <div className='invalid-login'>Password Does Not Match</div>}
        {userExists && <div className='invalid-login'>Username Already Taken</div>}
        <form className="user-form">
          <input type="text" name="username" placeholder="Username" required onChange={(e) => setUsernameValue(e.target.value)} style={{fontSize: "18px"}}></input>
          <input type="password" name="password" placeholder="Password" required onChange={(e) => setPasswordValue(e.target.value)} style={{fontSize: "18px"}}></input>
          <input type="password" name="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPasswordValue(e.target.value)} style={{fontSize: "18px"}}></input>
        </form>
        <button className="login-button" onClick={onClickSignUpUser}>SIGN UP</button>
        <div className="not-registered-text">Already Registered? <span onClick={navigateLogin}>Login</span></div>
      </div>
    )
}
