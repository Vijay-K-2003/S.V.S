import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate } from "react-router";


const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
  latitude: 0,
  longitude: 0,
  checked: false
};



const CreateCustomer = () => {
  const [customer, setCustomer] = useState(initialState);
  const [cus, setCus] = useState("");
  const [ven, setVen] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const userObject = useContext(myContext);

  const handleChange = (event) =>setCustomer((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

  const handleCheckBox = (e) => {
    var checked = e.target.checked;
    if(checked)
    {
      customer.checked = true;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
      customer.latitude = pos.coords.latitude;
      customer.longitude = pos.coords.longitude;
      
    })
  }}

  useEffect(() => {
    axios.get("http://localhost:4000/customers")
    .then((res) => {
setCus(res.data);

    })
  
   
  }, [])
  
  useEffect(() => {
    axios.get("http://localhost:4000/vendors")
    .then((res) => {
setVen(res.data);

    })
  
   
  }, [])
  
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    customer.email = userObject.email;
    validate(customer);
    setFormErrors(validate(customer));
    setIsSubmit(true);
    // send me
    
   
  }
    useEffect(() => {
      
      // console.log(formErrors);
      if(Object.keys(formErrors).length === 0 && isSubmit)
  {
    console.log(customer);
    navigate("/");
    axios
    .post("http://localhost:4000/customers/new", customer)
    .then((res) => {
          console.log(res.data);
        });
  
  }
   
  }, [formErrors])
  

  const validate = (values) => {
const errors = {};
// const regex = /^[^\s@]+@[^\s@]+\.[^s@]{2,}$/i;
const regexM = /^((\+91)?|91)?[789][0-9]{9}/;
if(!values.name)
{
  errors.name = "Name is required";
}
if(!values.mobileNumber)
{
  errors.mobileNumber = "Mobile No. is required";
}
else if(!(values.mobileNumber.match(regexM)))
{
errors.mobileNumber = "Please enter a valid Mobile No.";
}
if(values.checked === false)
{
  errors.location = "We need your location in order to compare it";
}

return errors;
  }


  return (
    <div>
    
    {/* {cus && cus.map((e) => {
       if(e.email === userObject.email)
       {
         navigate("/error/?error=A customer has already been registered with the same email");  //Should redirect to a error template displaying this message;
         return "A customer with the same email already exist";
       }
     })} */}

     {/* {ven && ven.map((e) => {
       if(e.email === userObject.email)
       {
         navigate("/error/?error=A vendor has already been registered with the same email");
         return "A vendor has already been registered with the same email";
       }
     })} */}
    
    
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={customer.name} onChange={handleChange} />
        <p>{formErrors.name}</p>
        {/* <label htmlFor="email">Email</label>
        <input type="email" name="email" value={customer.email} onChange={handleChange} /> */}
        <br />
        <label htmlFor="mobileNumber">Mobile No.(Include +91)</label>
        <input
          type="tel"
          name="mobileNumber"
          id="mobileNumber"
          value={customer.mobileNumber}
          onChange={handleChange}

        />
        <p>{formErrors.mobileNumber}</p>
<br />
        {/* <button type="button" onClick={handleLocation}>Current Location</button>  */}
        <input type="checkbox" onChange={handleCheckBox} name="location" id="location" />
        <label htmlFor="location">You are at location from where you want to be notified</label>
        <p>{formErrors.location}</p>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;
