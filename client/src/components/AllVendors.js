import React, { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import { useNavigate } from 'react-router';

import axios from "axios";


const AllVendors = () => {
  let navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const customerId = useParams().id;
  // const customerId = id;
  useEffect(() => {
    axios.get(`http://localhost:4000/customers/${customerId}/allVendor`).then((res) => {
      setVendor(res.data);
    });
  }, [ customerId ]);


  const handleVendor = (id) => {
    axios.get(`http://localhost:4000/customers/${customerId}/allVendor/${id}`)
    .then((res) => {
   navigate(`/customers/:id`);
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
            <Link to={`/customers/${customerId}/allVendor/${ven._id}`}><button onClick={() => handleVendor(ven._id)}>Approve</button></Link>
          </>
        );
      })}
    </div>
  );
};

export default AllVendors;
