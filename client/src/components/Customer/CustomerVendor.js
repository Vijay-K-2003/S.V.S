import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../Context";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../css/CustomerVendor.css";
import MyVendorImage from "../assets/yourvendor.svg";

toast.configure();
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
 return toast.success("Removed from your list of vendors", {position: toast.POSITION.BOTTOM_LEFT});

  }

  return (
    <div className="my-vendor-component">
      <h1 className="my-vendor-title">Here is ur vendors list</h1>
    <div className="my-vendor-data">
      {customer.myVendors && userObject.emails[0].value === customer.email ? (
        <div className="my-vendor-left">
 <ol>
 {Object.values(customer.myVendors).map((keyName, i) => (
<li className="my-vendor-list-item" key={i}>
    <div className="my-vendor-name">Name: {keyName.name}</div>
    <div className="my-vendor-phone">MobileNo: {keyName.mobileNumber}</div>
    <div className="my-vendor-area">Area: {keyName.area}</div>
    <div className="my-vendor-items">Items: {keyName.items+', '}</div>
    <button className="my-vendor-btn"id={i} onClick={() => handleVen(keyName._id, i)}>Disapprove</button>
</li>

))}
 </ol>
 </div>
      ): null}
     <div className="my-customer-right">
       <img className="my-customer-image" src={MyVendorImage} alt='my vendor' />
     </div>
     </div>
    </div>
  );
};

export default CustomerVendor;
