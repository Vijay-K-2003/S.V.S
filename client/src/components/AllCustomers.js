import React, { useState, useEffect } from "react";
import axios from "axios";


const AllCustomers = () => {
const [customer, setCustomer] = useState([]);


useEffect(() => {
    axios.get("http://localhost:4000/customers")
    .then((res) => {
        setCustomer(res.data);
    })
}, []);


  return <div>
<h1>Here is list of customers</h1>
{customer.map((cust) => {
    return(
        <>
        <h5>Name: {cust.name}</h5>
        <h5>Email: {cust.email}</h5>
        <h5>Mobile No. : {cust.mobileNumber}</h5>
        <h5>lat : {cust.latitude}</h5>
        <h5>long : {cust.longitude}</h5>
        </>
    )
})}
  </div>;
};

export default AllCustomers;

