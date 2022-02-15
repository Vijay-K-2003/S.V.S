import React, { useState, useEffect, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import { useNavigate } from 'react-router';
import { myContext } from "./Context";
import axios from "axios";


const AllVendors = () => {
  let navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [customer, setCustomer] = useState("");
  const customerId = useParams().id;
  const userObject = useContext(myContext);
  // const customerId = id;
  useEffect(() => {
    axios.get(`http://localhost:4000/customers/${customerId}/allVendor`).then((res) => {
      setVendor(res.data);
    });
  }, [ customerId ]);

  useEffect(() => {
    axios.get(`http://localhost:4000/customers/${customerId}`).then((res) => {
      console.log(res.data);
      setCustomer(res.data);
    });
  }, []);


  const handleVendor = (id) => {
    axios.put(`http://localhost:4000/customers/${customerId}/allVendor/${id}`)
    .then((res) => {
      console.log(res.data);
   navigate(`/customers/${customerId}`);
   
    })


}

  return (
    <div>
      <h1>Here is list of vendors</h1>
      {vendor.map((ven) => {
        return (
          <>
            <h5>Name: {ven.name}</h5>

            <h5>Mobile No. : {ven.mobileNumber}</h5>
            {userObject.email === customer.email ? (
              <Link to={`/customers/${customerId}/allVendor/${ven._id}`}><button onClick={() => handleVendor(ven._id)}>Approve</button></Link>
            ): null}
            
          </>
        );
      })}
    </div>
  );
};

export default AllVendors;
