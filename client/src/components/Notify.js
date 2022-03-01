import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const Notify = () => {

    const [customer, setCustomer] = useState("");
    const [vendor, setVendor] = useState("");

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

        let navigate = useNavigate();

        useEffect(() => {
          axios.get(`http://localhost:4000/customers/${id}/notify/${venid}`)
          .then((res) => {
              if(res.data === "Done")
              {
                  navigate("/getVendor");
              }
          })
        
         
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