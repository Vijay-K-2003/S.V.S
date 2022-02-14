import React from "react";
import googleImage from "./assets/googleimage.png";
import "./loginPage.css";

const LoginPage = () => {
<<<<<<< Updated upstream
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
=======

const googleLogin = () => {
  window.open("http://localhost:4000/google", "_self");
}

  return <div>
<h1>Login Page</h1>
<button onClick={googleLogin}>Login with Google</button> {/* This thing must contain Google symbol */}
    </div>
}
>>>>>>> Stashed changes

export default LoginPage;
