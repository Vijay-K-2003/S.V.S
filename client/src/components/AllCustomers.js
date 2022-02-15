import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import ViewCustomer from "./ViewCustomer";
import { myContext } from "./Context";


const AllCustomers = () => {
const [customer, setCustomer] = useState([]);
const userObject = useContext(myContext);


useEffect(() => {
    axios.get("http://localhost:4000/customers")
    .then((res) => {
    
        setCustomer(res.data);
    })
}, []);

let navigate = useNavigate();
const handleCustomer = (id) => {
 
    axios.get(`http://localhost:4000/customers/${id}`)
    .then((res) => {
      //Redirect to viewCustomer with res.data
   navigate(`/customers/${id}`);
    
    })


}


  return <div>
<h1>Here is list of customers</h1>
{customer.map((cust) => {
    return(
        <>
        <h5>Name: {cust.name}</h5>
        <h5>Email: {cust.email}</h5>
        <h5>Mobile No: {cust.mobileNumber}</h5>
        <h5>lat : {cust.latitude}</h5>
        <h5>long : {cust.longitude}</h5>
        <h5>UserObject : {userObject.email}</h5>

      {userObject.email === cust.email ? (
        <Link to={`/customers/${cust._id}`}>
        <button onClick={() => handleCustomer(cust._id)}>View Customer</button>
      </Link>
      ): "You are not authorized to do that"}
     
        
        </>
    )
})}
  </div>;
};

export default AllCustomers;

