import React from "react";
import googleImage from "./assets/googleimage.png";
import "./loginPage.css";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <h1>Login Page</h1>
      <div className="loginForm">
        <div className="googleContainer">
          <img src={googleImage} alt="googleImage" />
          <p>Login With Foogle</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
