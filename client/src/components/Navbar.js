import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import hamburger from "../components/assets/Navbar/hamburger.svg";
import {Link} from "react-router-dom";
import { myContext } from "./Context";
import '../css/Navbar.css';

const Navbar = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [isToggles, setIsToggled] = useState(false);
  const userObject = useContext(myContext);

  useEffect(() => {
    const getCustomer = async () => {
      const res = await axios.get("http://localhost:4000/customers");
      userObject &&
        res.data.map((e) => {
          if (e.email === userObject.emails[0].value) {
            setIsCustomer(true);
          }
        });
    };

    getCustomer();
  }, [userObject]);

  useEffect(() => {
    const getVendor = async () => {
      const res = await axios.get("http://localhost:4000/vendors");
      userObject &&
        res.data.map((e) => {
          if (e.email === userObject.emails[0].value) {
            setIsVendor(true);
          }
        });
    };

    getVendor();
}, [userObject]);

    const handleLogout = () => {
      axios
        .get("http://localhost:4000/logout", { withCredentials: true })
        .then((res) => {
          if (res.data === "success") {
            window.location.href = "/";
          }
        });
    };

    const handleHamburger = () => {
      let mainNav = document.getElementById("js-menu");
      mainNav.classList.toggle("active");
      setIsToggled(!isToggles);
    }


    return (
      <div>
    
      {userObject && !isCustomer && !isVendor ? (
        <div className={isToggles === false ? "bring-down navbar" : "navbar"}>
          <span className="navbar-toggle" id="js-navbar-toggle">
            <button className="hamburger-btn" onClick={handleHamburger}>
              <img class="hamburger" src={hamburger} alt="hamburger" />
            </button>
          </span>
          <div class="main-nav" id="js-menu">
            <Link to="/createCustomer" className="nav-link">
              Create a Customer
            </Link>
            <Link to="/createVendor" className="nav-link">
              Create a Vendor
            </Link>

            <Link to="/logout" onClick={handleLogout} className="nav-link">
              Logout
            </Link>
            <Link to="/" className="nav-link">
              Home
            </Link>

           
          </div>
        </div>
      ) : userObject && isCustomer && !isVendor ? (
        <div className={isToggles === false ? "bring-down navbar" : "navbar"}>
          <span className="navbar-toggle" id="js-navbar-toggle">
            <button className="hamburger-btn" onClick={handleHamburger}>
              <img class="hamburger" src={hamburger} alt="hamburger" />
            </button>
          </span>
          <div class="main-nav" id="js-menu">
           
            <Link to="/getCustomer" className="nav-link">
              Your Customer
            </Link>
            <Link to="/logout" onClick={handleLogout} className="nav-link">
              Logout
            </Link>
            <Link to="/" className="nav-link">
              Home
            </Link>

          </div>
        </div>
      ) : userObject && !isCustomer ? (
        <div className={isToggles === false ? "bring-down navbar" : "navbar"}>
          <span className="navbar-toggle" id="js-navbar-toggle">
            <button className="hamburger-btn" onClick={handleHamburger}>
              <img class="hamburger" src={hamburger} alt="hamburger" />
            </button>
          </span>
          <div class="main-nav" id="js-menu">
            <Link to="/getVendor" className="nav-link">
              Your Vendor
            </Link>
            <Link to="/logout" onClick={handleLogout} className="nav-link">
              Logout
            </Link>
            <a href="/" className="nav-link">
              Home
            </a>
          </div>
        </div>
      ) : (
        <div className={isToggles === false ? "bring-down navbar" : "navbar"}>
          <span className="navbar-toggle" id="js-navbar-toggle">
            <button className="hamburger-btn" onClick={handleHamburger}>
              <img class="hamburger" src={hamburger} alt="hamburger" />
            </button>
          </span>
          <div class="main-nav" id="js-menu">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/createCustomer" className="nav-link">
              Create a Customer
            </Link>
            <Link to="/createVendor" className="nav-link">
              Create a Vendor
            </Link>
            <a href="/" className="nav-link">
              Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
