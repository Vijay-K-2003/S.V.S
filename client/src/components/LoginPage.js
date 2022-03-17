import React from "react";
import googleImage from "./assets/googleimage.png";
import "../css/loginPage.css";
import loginpage from "./assets/loginpage.png"
import loginpagelogo from "./assets/loginpagelogo.png"


const LoginPage = () => {


const googleLogin = () => {
  window.open("http://localhost:4000/google", "_self");
}


  return<div>
    <div className="container">
   <section className="section-login-pg">
      <div className="login">
        <div className="login-text-box">
          <h1 className="heading-primary">
            Login To <br />
            Stay Connected ..
          </h1>
          <p className="login-info">
            Get instant notification as soon as your vendor get to your
            location, pick by your own hand or get it delivered fresh
          </p>
          <div className="media-grid">
            <div className="btn-area">
              <a href="#" className="login-btn">
                <div className="btn">
                  <div className="btn-text">Login With Google</div>
                  <div>
                    <img
                      src={googleImage}
                      alt="Googleimage.png"
                      className="google-logo"
                    />
                  </div>
                </div>
              </a>

              <div className="login-img">
                <img
                  src={loginpagelogo}
                  alt="loginpagelogo.png"
                  className="img-lock"
                />
              </div>
            </div>

            <div className="login-img-box">
              <img
                src={loginpage}
                alt="loginpage.png"
                className="login-img"
              />
            </div>
          </div>
        </div>
        {/* <ion-icon name="chevron-forward-outline" className="icon right"></ion-icon> */}
        {/* <ion-icon name="chevron-back-outline" className="icon left"></ion-icon> */}
      </div>
    </section>
    <script
      type="module"
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    ></script>
    </div>
</div>
}

export default LoginPage;