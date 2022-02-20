import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { myContext } from '../Context';

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
     
    
        <h1>This is your vendor</h1>
        {vendor.map((ven) => {
    return(
        <>
        {console.log(ven)}
        {/* {userObject.email === ven.email ? ( */}
    
         <ol>
             <li>
                 <h1>Your Vendor</h1>
                 <h3>Name: {ven.name}</h3>
                 <Link to={`/vendors/${ven._id}`}>
                     <button onClick={() => handleVendor(ven._id)}>Your View Page</button>
                 </Link>
             </li>
         </ol>
         {/* ): null}   */}
        </>
    )

        })}
    </div>
  )
}

export default YourVendor;