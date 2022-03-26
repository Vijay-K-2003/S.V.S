import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
  area: "",
  checked: false,
  latitude: 0,
  longitude: 0
};


const EditCustomer = () => {
    const [customer, setCustomer] = useState(initialState);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  

    const userObject = useContext(myContext);
    const {id} = useParams();

  const handleChange = (event) =>setCustomer((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

  
    const handleCheckBox = (e) => {
      var checked = e.target.checked;
      if(checked)
      {
        
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        customer.latitude = pos.coords.latitude;
        customer.longitude = pos.coords.longitude;
        
      })
    }}
  
    const handleEdit = (e) => {
      e.preventDefault();
      customer.email = userObject.email;
      validate(customer);
      setFormErrors(validate(customer));
      setIsSubmit(true);
   
    }

  useEffect(() => {
    axios.get(`http://localhost:4000/customers/${id}`)
    .then((res) => {
        setCustomer(res.data);
    })
  
   
  }, [])
  

  let navigate = useNavigate();
useEffect(() => {
  if(Object.keys(formErrors).length === 0 && isSubmit){
 
    axios
   .put(`http://localhost:4000/customers/${id}/edit`, customer)
   .then((res) => {
     console.log(res.data);
     setCustomer(res.data);
    


   });
   return toast.success("Updated Customer Successfully! Click on Home on the navbar to continue...", {position: toast.POSITION.BOTTOM_LEFT})
 
}

 
}, [formErrors])




 


  const validate = (values) => {
    const errors = {};
    const regexM = /^((\+91)?|91)?[789][0-9]{9}/;
    if(!values.name)
    {
      errors.name = "Name is required";
    }
    if(!values.mobileNumber)
    {
      errors.mobileNumber = "Mobile No. is required";
    }
    else if(!(String(values.mobileNumber).match(regexM)))
    {
    errors.mobileNumber = "Please enter a valid Mobile No.";
    }
    
    if(!values.area)
    {
      errors.area = "We would require your area for our convinience";
    }
    
    return errors;
      }


  return (
    <div>
       <form>
      <h1>Edit Customer</h1>
    <label htmlFor="name">Name</label>
    <input type="text" name="name" id="name" value={customer.name} onChange={handleChange} />
<p>{formErrors.name}</p>
    <label htmlFor="mobileNumber">Mobile No.(Must include +91)</label>
    <input
      type="tel"
      name="mobileNumber"
      id="mobileNumber"
      value={customer.mobileNumber}
      onChange={handleChange}

    />
   <p> {formErrors.mobileNumber}</p>


<label htmlFor="area">Please select area where you live</label>
<select name="area" value={customer.area} onChange={handleChange} id="area">
<option value="areas">Areas</option>
<option value="ambavadi">Ambavadi</option>
<option value="bhadaj">Bhadaj</option>
<option value="ghodasar">Ghodasar</option>
<option value="naranpura">Naranpura</option>
<option value="vastrapura">Vastrapur</option>
<option value="prahladnagar">Prahladnagar</option>

</select>
<p>{formErrors.area}</p>

<input type="checkbox" checked onChange={handleCheckBox} name="location" id="location" />
    <label htmlFor="location">You are at location from where you want to be notified</label>
    <p>{formErrors.location}</p>

    <button type="submit" onClick={handleEdit}>
      Update
    </button>
  </form>
     
    </div>
  );
};

export default EditCustomer;