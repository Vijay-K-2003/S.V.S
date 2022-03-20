import React, { useContext, useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import { myContext } from "./Context";
import "../css/Homepage.css";
import homepage from "./assets/homepage.png";
import homepagelogo from "./assets/homepagelogo.png";
import homepagelogoup from"./assets/homepagelogoup.png";


const HomePage = () => {
  const context = useContext(myContext);


  return (
    
  
    <div>
      <div className="containers">
        <div className="left">
       


     {context ? (
      <h1>Welcome to our site {context.username}</h1>
    ): <h1>Welcome to our site</h1>} 

   

<h1>Eat good<br></br>Feel good</h1>
<div className="leftdown ">
<button className="btn1">create customer</button>
<button className="btn2"> create vendor</button>
    </div>
  </div>
<div className="right">

  

  {/* <button className="btn3" >Login</button> */}
  < img className="logodown" src={homepagelogo} alt="homepagelogo.png"/>

<img className="logoup" src={homepagelogoup} alt="homepagelogoup.png"/>

<img className="mainimg" src={homepage} alt="homepage.png"/>

</div>
  </div>
    </div>
  );
};

export default HomePage;
