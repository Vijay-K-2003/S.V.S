import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import "../css/Notify.css"
import notifylogo from "./assets/notifylogo.png"

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
            const res = await axios.get(`https://smart-vendor1.herokuapp.com/vendors/${venid}`)
            setVendor(res.data);
        }
        ven();
         
        }, [])

        // const checkValid = (customer) => {
        //   navigator.geolocation.watchPosition((e) => {
        //     if(e.coords.latitude === customer.latitude && e.coords.longitude === customer.longitude)
        //     {
        //       setValid(true);
        //       console.log("It matched!");
        //     }
        //   })
        // }

        let navigate = useNavigate();
        let location = useLocation();
        useEffect(() => {
  
            // checkValid(customer);
            // if(valid === true)
            // {
          axios.get(`https://smart-vendor1.herokuapp.com/customers/${id}/notify/${venid}`)
          .then((res) => {
              if(res.data === "Done")
              {
                console.log("Yes");
                //   navigate("/getVendor");
              }
          })
          console.log(valid);
        
        // }
        // else if(valid === false){

        //   navigate("/error/?error=Your locations do not match, therefore you are not authorized to do that!");
        // }
        }, [])
        


     return (
    <div>
      <div className='containerss'>
        <div className='info'>
        <h1>Notification has been send to your costomer
        :{customer.name}</h1>
        {/* <h3>From vendor {vendor.name}</h3> */}
        </div>
        <div className='img' >
          <img src={notifylogo} alt="notifylogo.jpg"/>
          
          
        </div>
    </div>
    </div>
  )
}

export default Notify