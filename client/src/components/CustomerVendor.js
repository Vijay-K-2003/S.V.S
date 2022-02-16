import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerVendor = () => {
  const [customer, setCustomer] = useState("");

  const { id } = useParams();


  useEffect(() => {
  
  axios.get(`http://localhost:4000/customers/${id}`)
  .then((res) => {
  // console.log(res.data);
    setCustomer(res.data);
    
  })
  }, []);

//  if(customer.myVendors)
//  {
//    customer.myVendors.map((e) => {
//      navigator.geolocation.getCurrentPosition((pos) => {
//        if(pos.coords.latitude === customer.latitude && pos.coords.longitude === customer.longitude)
//        {
//          console.log("Matched");
//        }
//        else{
//          console.log("No matched")
//        }
//      })
//    })
//   }

  
   
 

  return (
    <div>
      <h1>Here is ur vendors list</h1>
    
      {customer.myVendors ? (
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
