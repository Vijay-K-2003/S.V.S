import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";

const Notify = () => {

    const [customer, setCustomer] = useState("");
    const [vendor, setVendor] = useState("");
    const [valid, setValid] = useState(false);

    const {id, venid} = useParams();

    useEffect(() => {
      
    const cust = async () => {
        const res = await axios.get(`http://localhost:4000/customers/${id}`)
        setCustomer(res.data);
    }
    cust();
     
    }, [])

    useEffect(() => {
      
        const ven = async () => {
            const res = await axios.get(`http://localhost:4000/vendors/${venid}`)
            setVendor(res.data);
        }
        ven();
         
        }, [])

        const checkValid = (customer) => {
          navigator.geolocation.watchPosition((e) => {
            if(e.coords.latitude === customer.latitude && e.coords.longitude === customer.longitude)
            {
              setValid(true);
            }
          })
        }

        let navigate = useNavigate();
        let location = useLocation();
        useEffect(() => {
  
            checkValid(customer);
            if(valid === true)
            {
          axios.get(`http://localhost:4000/customers/${id}/notify/${venid}`)
          .then((res) => {
              if(res.data === "Done")
              {
                //   navigate("/getVendor");
              }
          })
          console.log(valid);
        
        }
        else if(valid === false){

          navigate("/error/?error=Your locations do not match, therefore you are not authorized to do that!");
        }
        }, [])
        


     return (
    <div>
        <h1>Notify component</h1>
        <h3>Notify to customer {customer.name}</h3>
        <h3>From vendor {vendor.name}</h3>
    </div>
  )
}

export default Notify