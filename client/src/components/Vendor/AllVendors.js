import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";


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
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/customers/${customerId}`).then((res) => {
      // console.log(res.data);
      // console.log(customer.myVendors[0]._id)
      setCustomer(res.data);
    });
  }, []);

  const checkDisable = (index) => {
    document.getElementById(index).disabled = true;
    // console.log(index);
  }


  const handleVendor = (id, index) => {

    
    axios.put(`http://localhost:4000/customers/${customerId}/allVendor/${id}`)
    .then((res) => {
 
      
    })
    checkDisable(index);


}

// const checkDisable = (id) => {

// }

  return <div>
      <h1>Here is list of vendors</h1>
      {vendor.map((ven, index) => {
        return (
          <>
        
          <ul>
            <li>
            <h5>Name: {ven.name}</h5>

            <h5>Mobile No. : {ven.mobileNumber}</h5>
          
            {/* {console.log(customer.myVendors[0].vendor._id.toString())} */}
            { (customer.myVendors && !(customer.myVendors.filter(e => e._id === ven._id).length > 0))? (
              
              <button id={index} onClick={() => handleVendor(ven._id, index)}>Approve</button>
                //Frontend push 
              ): "Approved"} 

            
          
            </li>
            </ul>
          </>
        )
      })}
    </div>

};

export default AllVendors;
