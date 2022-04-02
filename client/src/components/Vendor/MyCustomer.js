import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { myContext } from '../Context';
import "../../css/MyCustomer.css";
import YourCustomer from "../assets/yourcoustmer.png";

const MyCustomer = () => {

    const [customer, setCustomer] = useState("");
    const [vendor, setVendor] = useState("");
    const userObject = useContext(myContext);
    const [empty, setEmpty] = useState(false);
    const {id} = useParams();

   

    useEffect(() => {
      const getCustomer = async() => {
          const res = await axios.get(`http://localhost:4000/vendors/${id}/myCustomers`)
          setCustomer(res.data);
          if (res.data.length === 0) {
            setEmpty(true);
          }
      }
    getCustomer();
    }, [id])

    useEffect(() => {
        const getVendor = async() => {
            const res = await axios.get(`http://localhost:4000/vendors/${id}`)
            setVendor(res.data);
        }
      getVendor();
       
      }, [id])

 
    
    return (
      
        <div className='my-customer-component'>
        {empty ? (
            <>
            <div className='empty-customer-flex'>
            
            <h1>You have been not approved by any customer till now</h1>
            
                    
                        <img src={YourCustomer} alt="my-customer" />
                    
                </div>
                </>
        ):
        <h1 className='my-customer-title'>Here is a list of customers who approved for you</h1> }
            {customer && customer.map((cus) => {
        return(
            <>
            <div className='my-customer-main'>
            <div className='my-customer-left'>

            {userObject.emails[0].value === vendor.email ? (
                <div className='my-customer-one'>
             <ul>
                 <li className='my-customer-list-item'>
                     
                     <h3 className='my-customer-name'>Name: {cus.name}</h3>
                     <h4 className='my-customer-area'>Who lives in : {cus.area}</h4>
                     <h4 className='my-customer-contact'>Contact: {cus.mobileNumber}</h4>
                   
                 </li>
             </ul>
             </div>
                
              ): null}  
              </div>
              <div className='my-customer-right'>
                  <img className='my-customer-image' src={YourCustomer} alt="my-customer" />
              </div>
              </div>
            </>
        )
    
            })}
        </div>
      )
  
}

export default MyCustomer
