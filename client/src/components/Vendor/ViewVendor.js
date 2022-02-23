import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {useNavigate, useParams } from 'react-router-dom';
import { myContext } from '../Context';

const ViewVendor = () => {

    const [vendor, setVendor] = useState("");
const userObject = useContext(myContext);
    
const {id} = useParams();
    useEffect(() => {
      
    axios.get(`http://localhost:4000/vendors/${id}`)
    .then((res) => {
        setVendor(res.data);
    })
     
    }, [])
let navigate = useNavigate();
    const handleTracking = () => {
        navigate(`locate`);
    }

  
        const handleDelete = () => {
            navigate("/");
                    axios.delete(`http://localhost:4000/vendors/${id}/delete`)
                    .then((res) => {
                     
                    }).catch((e) => {
                        console.log(e);
                    })
                
            }
            
    
    
  return (
      <div>
      {userObject.email === vendor.email ? (
          <>
        <h1>View Vendor</h1>
        <h3>Name: {vendor.name}</h3>
        <h3>Mobile Number: {vendor.mobileNumber}</h3>
        <h3>Email: {vendor.email}</h3>
        <button onClick={handleTracking}>Start Tracking</button>
        <button onClick={handleDelete}>Delete</button>
        </>
        ): null}
        </div>
        
  )
}

export default ViewVendor;