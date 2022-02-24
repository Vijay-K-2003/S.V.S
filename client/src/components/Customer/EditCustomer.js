import React, { useState, useContext } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate } from "react-router";

const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
  latitude: 0,
  longitude: 0
};



const CreateCustomer = () => {
  const [customer, setCustomer] = useState(initialState);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const userObject = useContext(myContext);

  const handleChange = (event) =>setCustomer((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
      customer.latitude = pos.coords.latitude;
      customer.longitude = pos.coords.longitude;
      
    })
  }
let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    customer.email = userObject.email;
    //send me
    navigate("/");
    axios
      .post("http://localhost:4000/customers/new", customer)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={customer.name} onChange={handleChange} />
        {/* <label htmlFor="email">Email</label>
        <input type="email" name="email" value={customer.email} onChange={handleChange} /> */}
        
        <label htmlFor="mobileNumber">Mobile No.</label>
        <input
          type="tel"
          name="mobileNumber"
          id="mobileNumber"
          value={customer.mobileNumber}
          onChange={handleChange}

        />

        <h4>Please provide ur location</h4>
        {/* <input type="number" name="latitude" value={customer.latitude} onChange={handleChange} id="latitude" />
        <input type="number" name="longitude" value={customer.longitude} onChange={handleChange} id="longitude" /> */}
        <button type="button" onClick={handleLocation}>Current Location</button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;