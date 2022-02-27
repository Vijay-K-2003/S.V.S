import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { myContext } from '../Context';

const MyCustomer = () => {

    const [customer, setCustomer] = useState("");
    const [vendor, setVendor] = useState("");
    const userObject = useContext(myContext);
    const {id} = useParams();

   

    useEffect(() => {
      const getCustomer = async() => {
          const res = await axios.get(`http://localhost:4000/vendors/${id}/myCustomers`)
          setCustomer(res.data);
      }
    getCustomer();
     
    }, [])

    useEffect(() => {
        const getVendor = async() => {
            const res = await axios.get(`http://localhost:4000/vendors/${id}`)
            setVendor(res.data);
        }
      getVendor();
       
      }, [])

 
    
    return (
      
        <div>
      <h1>Here is a list of customers who approved for you</h1>   
        
            {customer && customer.map((cus) => {
        return(
            <>
            {/* {console.log(ven)} */}
            {userObject.email === vendor.email ? (
        
             <ol>
                 <li>
                     
                     <h3>Name: {cus.name}</h3>
                     <h4>Who lives in : {cus.area}</h4>
                     <h4>Contact: {cus.mobileNumber}</h4>
                   
                 </li>
             </ol>
              ): null}  
            </>
        )
    
            })}
        </div>
      )
  
}

export default MyCustomer