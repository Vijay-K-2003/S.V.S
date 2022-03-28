import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {useNavigate, useParams, Link } from 'react-router-dom';
import { myContext } from '../Context';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../css/ViewVendor.css";

toast.configure();

const ViewVendor = () => {

    const [vendor, setVendor] = useState("");

const userObject = useContext(myContext);
    
const {id} = useParams();
    useEffect(() => {
      
    axios.get(`https://smart-vendor1.herokuapp.com/vendors/${id}`)
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
                    axios.delete(`https://smart-vendor1.herokuapp.com/vendors/${id}/delete`)
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
                <div className='containervv'>
                  
                {userObject.email === vendor.email ? (
                    <div className='container-flex-data'>
                        <div className='leftvv'>
                  <h1 className='title-view-vendor'>View Vendor</h1>

                  <div className='leftin'>
                  <h3 className='namevv'>Name: {vendor.name}</h3>
                  <h3 className='phvv'>Mobile Number: {vendor.mobileNumber}</h3>
                  <h3 className='mailvv'>Email: {vendor.email}</h3>
                  <h3 className='itemsvv'>Items on cart:</h3>
                  {vendor.items.map((e, index) => {
                      return(
                          <h4 className='itemsvv'>
                
                            <span className={index+1}>{index+1}. {e}</span>
                            
                              </h4>
                          )
                  })}
                  </div>
                  </div>
                  <br />
                  
                  <div className='rightvv'>
                  <button className='btn-st' onClick={handleTracking}>Start Tracking</button>
                  <Link className='btn-mc' to={`/vendors/${id}/myCustomers`}><button className='btn-mc'>  My Customers</button></Link>
                  <button className='btn-edit' onClick={handleEdit}>Edit</button>
                  <button className='btn-delete' onClick={handleDelete}>Delete</button>
                  </div>
                 </div>
                  ): null}
                  
                  </div>
              
            )
}

export default ViewVendor;
