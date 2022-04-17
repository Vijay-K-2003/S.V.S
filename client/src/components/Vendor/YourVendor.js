import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { myContext } from '../Context';
import "../../css/YourVendor.css";
import yourVendorImage from "../assets/yourVendor/yourvendor.svg";

const YourVendor = () => {

    const [vendor, setVendor] = useState([]);
    const userObject = useContext(myContext);

    useEffect(() => {
      axios.get("http://localhost:4000/vendors")
      .then((res) => {
          setVendor(res.data);
        console.log(res.data);
          
      })
    
     
    }, [])
let navigate = useNavigate();
    const handleVendor = (id) => {
        axios.get(`http://localhost:4000/vendors/${id}`)
        .then((res) => {
            navigate(`/vendors/${id}`);
        })
    }
    
  return (
      
    <div>
     
    
        {vendor.map((ven) => {
    return(
        <>
        {/* {console.log(ven)} */}
        {userObject.emails[0].value === ven.email ? (
        <div className="your-vendor-component">  
        <div className='your-vendor-left'>
        {/* <div className='your-vendor-left-inside'> */}
        <ul>
             <li>
                 <h1 className='your-vendor-title'>Your Vendor</h1>
                 <h3 className='your-vendor-name'>Name: {ven.name}</h3>
                 <h4 className='your-vendor-area'>Preffered Area: {ven.area}</h4>
                 <Link to={`/vendors/${ven._id}`}>
                     <button className='your-vendor-btn' onClick={() => handleVendor(ven._id)}>Your View Page</button>
                 </Link>
             </li>
         </ul>
        </div> 
        {/* </div>      */}
        
        <div className='your-vendor-right'>
            <img className='your-vendor-right-image' src={yourVendorImage} alt='the vendor' />
        </div> 

         </div>
          ): null}  
        </>
    )

        })}
    </div>
  )
}

export default YourVendor;
