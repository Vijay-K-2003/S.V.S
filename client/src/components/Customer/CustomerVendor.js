import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../Context";
import axios from "axios";

const CustomerVendor = () => {
  const [customer, setCustomer] = useState("");
  const userObject = useContext(myContext);

  const { id } = useParams();


  useEffect(() => {
  
  axios.get(`http://localhost:4000/customers/${id}`)
  .then((res) => {
  // console.log(res.data);
    setCustomer(res.data);
    
  })
  }, []);

  const checkDisable = (index) => {
    document.getElementById(index).disabled = true;
  }

  const handleVen = (venid, index) => {
 axios.delete(`http://localhost:4000/customers/${id}/myVendor/${venid}`)
 .then((res) => {

 })
 checkDisable(index);
  }

  return (
    <div>
      <h1>Here is ur vendors list</h1>
    
      {customer.myVendors && userObject.email === customer.email ? (
 <ol>
 {Object.values(customer.myVendors).map((keyName, i) => (
<li key={i}>
    <span>Name: {keyName.name}</span>
    <span>MobileNo: {keyName.mobileNumber}</span>
    <div>Area: {keyName.area}</div>
    <button id={i} onClick={() => handleVen(keyName._id, i)}>Disapprove</button>
</li>

))}
 </ol>
      ): null}
     

    </div>
  );
};

export default CustomerVendor;
