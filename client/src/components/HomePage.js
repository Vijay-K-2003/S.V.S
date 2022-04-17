import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "./Context";
import "../css/Homepage.css";
import homepage from "../components/assets/HomePage/homepage.svg";

const HomePage = () => {
  const context = useContext(myContext);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const getCustomer = async () => {
      const res = await axios.get("http://localhost:4000/customers");
      context &&
        res.data.map((e) => {
          if (e.email === context.emails[0].value) {
            setIsCustomer(true);
          }
        });
    };

    getCustomer();
  }, [context]);

  useEffect(() => {
    const getVendor = async () => {
      const res = await axios.get("http://localhost:4000/vendors");
      context &&
        res.data.map((e) => {
          if (e.email === context.emails[0].value) {
            setIsVendor(true);
          }
        });
    };

    getVendor();
  }, [context]);

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

  return (
    <div>
      <div className="containers">
        <div className="left">
          {context && isCustomer === true ? (
            <div>
              <h1>Welcome to our site {context.displayName}</h1>
              <h1>
                Eat good<br></br>Feel good
              </h1>
              <div className="btn-c-flex">
                <button className="btn-yourC" onClick={yourCustomer}>
                  Your Customer
                </button>
              </div>
            </div>
          ) : context && isVendor === true ? (
            <div>
              <h1>Welcome to our site {context.displayName}</h1>
              <h1>
                Eat good<br></br>Feel good
              </h1>
              <div className="btn-v-flex">
                <button className="btn-yourV" onClick={yourVendor}>
                  Your Vendor
                </button>
              </div>
            </div>
          ) : (
            <div className="leftdownn">
              <div>
                <h1>Welcome to our site</h1>
              </div>
              <div>
                <h1>
                  Eat good<br></br>Feel good
                </h1>
              </div>
              <div>
                <button className="btn1" onClick={createCustomer}>
                  Create Customer
                </button>
                <button className="btn2" onClick={createVendor}>
                  {" "}
                  Create Vendor
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="right">
          {/* <img className="logodown" src={homepagelogo} alt="homepagelogo.png" /> */}

          

          <img className="mainimg" src={homepage} alt="homepage.svg" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;