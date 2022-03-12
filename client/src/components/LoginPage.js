import React from "react";
import googleImage from "./assets/googleimage.png";
import "./loginPage.css";


const LoginPage = () => {


const googleLogin = () => {
  window.open("http://localhost:4000/google", "_self");
}


  return <div>
<h1>Login Page</h1>
{/* <img src={googleImage} alt="googleIcon.png" /> */}

<button onClick={googleLogin}>Login with Google</button>
    </div>
}

export default LoginPage;
