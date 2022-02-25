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
  const [cus, setCus] = useState("");
  const [ven, setVen] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
const userObject = useContext(myContext);

  const handleChange = (event) =>setVendor((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

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
    vendor.email = userObject.email;
    validate(vendor);
    setFormErrors(validate(vendor));
    setIsSubmit(true);

  };

  useEffect(() => {
      
    // console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit)
{
  console.log(vendor);
  navigate("/");
    axios
      .post("http://localhost:4000/vendors/new", vendor)
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
 <input type="text" name="name" id="name" value={vendor.name} onChange={handleChange} />
 <p>{formErrors.name}</p>
 {/* <label htmlFor="email">Email</label>
 <input type="email" name="email" value={vendor.email} onChange={handleChange} /> */}
 <label htmlFor="mobileNumber">Mobile No.(Include 91)</label>
 <input
   type="tel"
   name="mobileNumber"
   id="mobileNumber"
   value={vendor.mobileNumber}
   onChange={handleChange}

 />
 <p>{formErrors.mobileNumber}</p>
 <button type="submit" onClick={handleSubmit}>
   Submit
 </button>
</form>
   
     
    </div>
  );
};

export default CreateVendor;
