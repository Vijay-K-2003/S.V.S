import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerVendor = () => {
  const [customer, setCustomer] = useState("");

  const { id } = useParams();


  useEffect(() => {
  
  axios.get(`http://localhost:4000/customers/${id}`)
  .then((res) => {
  
    setCustomer(res.data);
    
  })
  }, []);

 useEffect(() => {
   
  navigator.geolocation.watchPosition((pos) => {
   
      console.log(pos.coords.latitude);
      console.log(pos.coords.longitude);
      // console.log(customer.latitude);
      // console.log(customer.longitude);
    
    
      // console.log("It did not match!");
    
  })
   
 }, [])
 

  return (
    <div>
      <h1>Here is ur vendors list</h1>
    
      {customer.myVendors ? (
 <ol>
 {Object.values(customer.myVendors).map((keyName, i) => (
<li key={i}>
    <span>Name: {keyName.vendor.name}</span>
    <span>MobileNo: {keyName.vendor.mobileNumber}</span>
</li>

))}
 </ol>
      ): null}
     

    </div>
  );
};

export default CustomerVendor;
