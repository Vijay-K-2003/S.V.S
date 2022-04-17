import React from "react";
import googleImage from "./assets/loginPage/googleimage.png";
import "../css/loginPage.css";
import loginpage from "./assets/loginPage/loginpage.png";
import loginpagelogo from "./assets/loginPage/loginpagelogo.png"


const LoginPage = () => {


const googleLogin = () => {
  window.open("http://localhost:4000/google", "_self");
}


  return<div>
  <div className="container">
    <div className="divleft">
      <h1>Login to<br></br>
      stay connected...</h1>
      <p>Get instant notification as soon as your vendor get to your location , pick by your own hand or get it delivered fresh.</p>
      {/* <img src={googleImage} alt="googleIcon.png" /> */}
      <div className="leftdown">

        <button className="btn" onClick={googleLogin}>
        <div class="btn-text">Login with Google<img src={googleImage} alt="googleimage.png" /> </div></button>
        
        <span className="logo">
          < img src={loginpagelogo} alt="loginpagelogo.png" />

        </span>

      </div>
    </div>
    <div className="divright">


      <img src={loginpage} alt="loginpage.png" />


    </div>
  </div>

</div>
}

export default LoginPage;
