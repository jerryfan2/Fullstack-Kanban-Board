import React, { useState } from 'react'
import "./login-page.css"
import { useNavigate } from "react-router-dom"

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../GraphQL/Mutations";

export default function () {
  const [loginUser] = useMutation(LOGIN_USER);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [isInvalid, setIsInvalid] = useState(false);

  const onClickLoginUser = async () => {
    const loginUserData = await loginUser({
      variables: {
        username: usernameValue,
        password: passwordValue
      }
    })
    if (loginUserData.data.loginUser !== null) {
      navigate("/");
      window.location.reload();
    }
    setIsInvalid(true);
  }

  const navigate = useNavigate();

  const navigateSignup = () => {
    navigate("/user/signup");
  }

  return (
    <div className="login-container">
      <div className="welcome-back-title">WELCOME BACK!</div>
      {isInvalid && <div className="invalid-login">Invalid Login Credentials</div>}
      <form className="user-form">
        <input type="text" id="username" name="username" placeholder="Username" required onChange={(e) => setUsernameValue(e.target.value)}></input>
        <input type="password" id="password" name="password" placeholder="Password" required onChange={(e) => setPasswordValue(e.target.value)}></input>
      </form>
      <button className="login-button" onClick={onClickLoginUser}>LOGIN</button>
      <div className="not-registered-text">Not Registered? <span onClick={navigateSignup}>Sign up</span></div>
    </div>
  )
}
