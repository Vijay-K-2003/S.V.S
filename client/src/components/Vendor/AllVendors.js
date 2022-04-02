import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import "../../css/AllVendors.css"
import AllVendorImage from "../assets/loginpage.png";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const AllVendors = () => {

  const [vendor, setVendor] = useState([]);
  // const [disable, setDisable] = useState(false);
  const [customer, setCustomer] = useState("");
  const customerId = useParams().id;
  
  // const customerId = id;
  useEffect(() => {
    axios.get(`http://localhost:4000/customers/${customerId}/allVendor`).then((res) => {
      // setVendor(customer.myVendors.filter(e => e.vendor._id.toString() !==).length > 0);
      setVendor(res.data);
    });
  }, [customerId]);

  useEffect(() => {
    axios.get(`http://localhost:4000/customers/${customerId}`).then((res) => {
      // console.log(res.data);
      // console.log(customer.myVendors[0]._id)
      setCustomer(res.data);
    });
  }, [customerId]);

  const checkDisable = (index) => {
    document.getElementById(index).disabled = true;
    // console.log(index);
  }


  const handleVendor = (id, index) => {

    
    axios.put(`http://localhost:4000/customers/${customerId}/allVendor/${id}`)
    .then((res) => {
      
 })
    checkDisable(index);
    return toast.success("Added to your list of vendors", {position: toast.POSITION.BOTTOM_LEFT});


}

// const checkDisable = (id) => {

// }

  return <div className="container-all-vendor">
      <div className="data-left-vendor">
      <h1 className="title-all-vendor">Here is list of vendors</h1>
      {vendor.map((ven, index) => {
        return (
          <>
          <div className="vendor-item">
          <ul>
            <li>
            <h5>Name: {ven.name}</h5>

            <h5>Mobile No. : {ven.mobileNumber}</h5>

            <h5>You may find this vendor near {ven.area}</h5>

            <h5>Items found on his cart: {ven.items+','}</h5>
          
            {/* {console.log(customer.myVendors[0].vendor._id.toString())} */}
            { (customer.myVendors && !(customer.myVendors.filter(e => e._id === ven._id).length > 0))? (
              
              <button className="btn-all-vendor" id={index} onClick={() => handleVendor(ven._id, index)}>Approve</button>
                //Frontend push 
              ): "Approved"} 

            
          
            </li>
            </ul>
            </div>
          </>
        )

      })}
      </div>

      <div className="image-right-all-vendor">
        <img src={AllVendorImage} alt="allvendorimage"></img>
      </div>
    </div>

};

export default AllVendors;
