import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const AllCustomers = () => {
const [vendor, setVendor] = useState([]);

const { id } = useParams();
useEffect(() => {
    axios.get(`http://localhost:4000/customer/${id}/allVendor`)
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
       
        </>
    )
})}
  </div>;
};

export default AllCustomers;

