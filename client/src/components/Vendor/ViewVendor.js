import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {useNavigate, useParams, Link } from 'react-router-dom';
import { myContext } from '../Context';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
            // navigate("/");
                    axios.delete(`http://localhost:4000/vendors/${id}/delete`)
                    .then((res) => {
                    navigate("/");
                    }).catch((e) => {
                        console.log(e);
                    })

                    return toast.success("Deleted Vendor Successfully! Click on Home on the navbar to continue...", {position: toast.POSITION.BOTTOM_LEFT})

                
            }
            
            const handleEdit = () => {
                navigate(`edit`);
            }
    
    
  return (
      <div>
        
      {userObject.email === vendor.email ? (
        <div>
        <h1>View Vendor</h1>
        <h3>Name: {vendor.name}</h3>
        <h3>Mobile Number: {vendor.mobileNumber}</h3>
        <h3>Email: {vendor.email}</h3>
        <h3>Items on cart:</h3>
        {vendor.items.map((e) => {
            return(
                <h4>{e}, </h4>
            )
        })}
        <br />
        <button onClick={handleTracking}>Start Tracking</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
        <Link to={`/vendors/${id}/myCustomers`}><button>My Customers</button></Link>
        </div>
        ): null}
        
        </div>
    
  )
}

export default ViewVendor;