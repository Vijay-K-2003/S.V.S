import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "./Context";
import "../css/Homepage.css";
import homepage from "./assets/homepage.png";
import homepagelogo from "./assets/homepagelogo.png";
import homepagelogoup from "./assets/homepagelogoup.png";

const HomePage = (props) => {
  const context = useContext(myContext);

  let navigate = useNavigate();
  const createCustomer = () => {
    navigate("/createCustomer");
  };

  const createVendor = () => {
    navigate("/createVendor");
  };

  const yourCustomer = () => {
    navigate("/getCustomer");
  };

  const yourVendor = () => {
    navigate("/getVendor");
  };
  console.log(props.customer);

  return (
    <div>
      <div className="containers">
        <div className="left">
          {context && props.customer === true ? (
            <div>
              <h1>Welcome to our site {context.displayName}</h1>
              <button className="Home-yourCustomer" onClick={yourCustomer}>
                Your Customer
              </button>
            </div>
          ) : context && props.customer === false ? (
            <div>
              <h1>Welcome to our site {context.displayName}</h1>
              <button className="Home-yourCustomer" onClick={yourVendor}>
                Your Vendor
              </button>
            </div>
          ) : (
            <h1>Welcome to our site</h1>
          )}

          <h1>
            Eat good<br></br>Feel good
          </h1>
          <div className="leftdown ">
            <button className="btn1" onClick={createCustomer}>
              Create Customer
            </button>
            <button className="btn2" onClick={createVendor}>
              {" "}
              Create Vendor
            </button>
          </div>
        </div>
        <div className="right">
          <img className="logodown" src={homepagelogo} alt="homepagelogo.png" />

          <img
            className="logoup"
            src={homepagelogoup}
            alt="homepagelogoup.png"
          />

          <img className="mainimg" src={homepage} alt="homepage.png" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
