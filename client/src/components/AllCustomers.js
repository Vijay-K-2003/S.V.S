import React, { useState, useEffect } from "react";
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


const AllCustomers = () => {
const [customer, setCustomer] = useState([]);


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
       
     <Link to={`/customers/${cust._id}`}>
       <button onClick={() => handleCustomer(cust._id)}>View Customer</button>
     </Link>
        
        </>
    )
})}
  </div>;
};

export default AllCustomers;

