import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';
import {
  
  Link,

} from "react-router-dom";
import { myContext } from "../Context";


const YourCustomer = () => {
const [customer, setCustomer] = useState([]);
const userObject = useContext(myContext);


useEffect(() => {
    axios.get("http://localhost:4000/customers")
    .then((res) => {
    
        setCustomer(res.data);
    })
},[]);

let navigate = useNavigate();
const handleCustomer = (id) => {
 
    axios.get(`http://localhost:4000/customers/${id}`)
    .then((res) => {
      //Redirect to viewCustomer with res.data
   navigate(`/customers/${id}`);
    
    })


}


  return <div>

{customer.map((cust) => {
  return(
    <>
      {userObject.email === cust.email ? (
        
        <ol>
          <li>
            <h1>Your customer</h1>
        <h3>Name: {cust.name}</h3>
       

        <Link to={`/customers/${cust._id}`}>
        
        <button onClick={() => handleCustomer(cust._id)}>Your View Page</button>
      </Link>
      </li>
     </ol>
       ): null} 
      
        
        </>
        )
})}
  </div>;
};

export default YourCustomer;

