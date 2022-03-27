import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';
import {
  Link,
} from "react-router-dom";
import { myContext } from "../Context";
import "../../css/YourCustomer.css";
import YourCustomerImage from "../assets/YourCustomer.svg";

const YourCustomer = () => {
const [customer, setCustomer] = useState([]);
const userObject = useContext(myContext);


useEffect(() => {
    axios.get("http://localhost:4000/customers")
    .then((res) => {
    
        setCustomer(res.data);
    })
},[]);

let navigate = useNavigate();
const handleCustomer = (id) => {
 
    axios.get(`http://localhost:4000/customers/${id}`)
    .then((res) => {
      //Redirect to viewCustomer with res.data
   navigate(`/customers/${id}`);
    
    })


}


  return <div>

{customer.map((cust) => {
  return(
    <>
      {userObject.email === cust.email ? (
        <div className="your-customer-component">
          <div className="your-customer-left">
            {/* <div  className="your-customer-left-inside"> */}
            <ul>
          <li>
            <h1 className="your-customer-title">Your customer</h1>
        <h3 className="your-customer-name">Name: {cust.name}</h3>
       

        <Link to={`/customers/${cust._id}`}>
        
        <button className="your-customer-btn"onClick={() => handleCustomer(cust._id)}>Your View Page</button>
      </Link>
      </li>
     </ul>
            {/* </div> */}
          
          </div>
          <div className="your-customer-right">
            <img className="your-customer-right-image" src={YourCustomerImage} alt="customer" />
          </div>
     </div>
       ): null} 
      
        
        </>
        )
})}
  </div>;
};

export default YourCustomer;
