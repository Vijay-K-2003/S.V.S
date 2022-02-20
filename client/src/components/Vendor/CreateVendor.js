import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate } from "react-router";

const initialState = {
  name: "",
  email: "",
  mobileNumber: "",

};

const CreateVendor = () => {
  
  const [vendor, setVendor] = useState(initialState);
const userObject = useContext(myContext);

  const handleChange = (event) =>setVendor((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    vendor.email = userObject.email;
navigate("/");
    axios
      .post("http://localhost:4000/vendors/new", vendor)
      .then((res) => {
    
      console.log(res.data);
      });
  };

  
   
  

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
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateVendor;
