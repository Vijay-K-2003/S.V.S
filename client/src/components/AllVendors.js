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
      
        <h5>Mobile No. : {ven.mobileNumber}</h5>
        {/* <Link to={`/customers/${cust._id}`}>
       <button onClick={() => handleCustomer(cust._id)}>View Customer</button>
     </Link>
        */}
        </>
    )
})}
  </div>;
};

export default AllCustomers;

