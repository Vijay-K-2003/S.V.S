import React, { useContext, useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import { myContext } from "./Context";

const HomePage = () => {
  const context = useContext(myContext);


  return (
    
  
    <div>


     {context ? (
      <h1>Welcome to our site {context.username}</h1>
    ): <h1>Welcome to our site</h1>} 
  

    </div>
  );
};

export default HomePage;
