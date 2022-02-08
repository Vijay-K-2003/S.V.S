import React, { useState, useEffect } from "react";
import axios from "axios";


const AllCustomers = () => {
const [vendor, setVendor] = useState([]);


useEffect(() => {
    axios.get("http://localhost:4000/vendors")
    .then((res) => {
        setVendor(res.data);
    })
}, []);


  return <div>
<h1>Here is list of vendors</h1>
{vendor.map((ven) => {
    return(
        <>
        <h5>Name: {ven.name}</h5>
        {/* <h5>Email: {ven.email}</h5> */}
        <h5>Mobile No. : {ven.mobileNumber}</h5>
        {/* <h5>lat : {ven.latitude}</h5>
        <h5>long : {ven.longitude}</h5> */}
        </>
    )
})}
  </div>;
};

export default AllCustomers;

