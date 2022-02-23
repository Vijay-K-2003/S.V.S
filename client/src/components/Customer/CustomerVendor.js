import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { myContext } from "../Context";
import axios from "axios";

const CustomerVendor = () => {
  const [customer, setCustomer] = useState("");
  const userObject = useContext(myContext);

  const { id } = useParams();

let location = useLocation();
  useEffect(() => {
  
  axios.get(`http://localhost:4000/customers/${id}`)
  .then((res) => {
  // console.log(res.data);
    setCustomer(res.data);
    
  })
  }, []);

  return (
    <div>
      <h1>Here is ur vendors list</h1>
    
      {customer.myVendors && userObject.email === customer.email ? (
 <ol>
 {Object.values(customer.myVendors).map((keyName, i) => (
<li key={i}>
    <span>Name: {keyName.name}</span>
    <span>MobileNo: {keyName.mobileNumber}</span>
</li>

))}
 </ol>
      ): null}
     

    </div>
  );
};

export default CustomerVendor;
