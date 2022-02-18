import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  name: "",
  mobileNumber: "",
//   latitude: 0,
//   longitude: 0
};

const CreateVendor = () => {
  
  const [vendor, setVendor] = useState(initialState);
  const[ven, setVen] = useState("");
  const [customer, setCustomer] = useState([]);

//   const [lat, setLat] = useState(0);
//   const [lng, setLng] = useState(0);

  const handleChange = (event) =>setVendor((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));




useEffect(() => {
  axios.get("http://localhost:4000/customers")
  .then((res) => {
      setCustomer(res.data);
  })
}, []);

useEffect(() => {
  const ven = async() => {

    const res = await axios.get("http://localhost:4000/vendors")

    setVen(res.data);
  }
 ven();
  
}, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(vendor);
    // console.log(customer[0].latitude);
    axios
      .post("http://localhost:4000/vendors/new", vendor)
      .then((res) => {
    
      
      });
  };

  navigator.geolocation.watchPosition((pos) => {
    customer.map((cust) => {
     
    //  if (pos.coords.latitude === cust.latitude && pos.coords.longitude === cust.longitude) {
       console.log(cust.latitude);
      //  console.log(ven[0]._id);
      console.log(pos.coords.latitude);
      
     }
    //  else{
      //  console.log(cust._id);
    //  }
  
    )
  })
   
  

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={vendor.name} onChange={handleChange} />
        {/* <label htmlFor="email">Email</label>
        <input type="email" name="email" value={vendor.email} onChange={handleChange} /> */}
        <label htmlFor="mobileNumber">Mobile No.</label>
        <input
          type="tel"
          name="mobileNumber"
          id="mobileNumber"
          value={vendor.mobileNumber}
          onChange={handleChange}

        />

        {/* <h4>Please provide ur location</h4> */}
        {/* <input type="number" name="latitude" value={vendor.latitude} onChange={handleChange} id="latitude" />
        <input type="number" name="longitude" value={vendor.longitude} onChange={handleChange} id="longitude" /> */}
        {/* <button type="button" onClick={handleLocation}>Current Location</button> */}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateVendor;
