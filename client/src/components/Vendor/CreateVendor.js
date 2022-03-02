import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate } from "react-router";
import FlashMessage from 'react-flash-message';

const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
  area: "",
  items: []
};

const CreateVendor = () => {
  const items = ['Tomato', 'Potato', 'Carrot', 'Brinjal', 'Onion', 'Capsicum', 'Cabbage', 'Cauliflower', 'Lady finger', 'Apple', 'Banana', 'Grapes', 'Chiku', 'Pomegranate']
  const [vendor, setVendor] = useState(initialState);
 const [checked, setChecked] = useState(
    new Array(items.length).fill(false)
);
  const [cus, setCus] = useState("");
  const [ven, setVen] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
const userObject = useContext(myContext);
const [message, showMessage] = useState(false);

  const handleChange = (event) =>setVendor((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

  const handleItemChange = (position) => {
    const updatedChecked = checked.map((item, index) =>
       position === index ? ! item: item
    );

  
    setChecked(updatedChecked);
  };
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
    addItems(checked);
    // vendor.items = checked
    validate(vendor);
    setFormErrors(validate(vendor));
    setIsSubmit(true);
    showMessage(true);
  };

  const addItems = (checked) => {
    checked.map((e, index) => {
      if(e)
      {
        vendor.items.push(items[index]);
      }
    })
  }
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
   if(!values.area)
   {
     errors.area = "Please select a preffered area";
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
     {
       message === true ?
       (
         <div>
         <FlashMessage duration={5000}>
           <h1>Vendor Created</h1>
         </FlashMessage>
         </div>
       ):
       <form>
       <h1>Create Vendor</h1>
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
     <label htmlFor="area">Please select area where you spend maximum time of the day</label>
    <select name="area" value={vendor.area} onChange={handleChange} id="area">
      <option value="areas">Areas</option>
      <option value="ambavadi">Ambavadi</option>
      <option value="bhadaj">Bhadaj</option>
      <option value="ghodasar">Ghodasar</option>
      <option value="naranpura">Naranpura</option>
      <option value="vastrapura">Vastrapur</option>
      <option value="prahladnagar">Prahladnagar</option>
    
    </select>
    <p>{formErrors.area}</p>
    <label htmlFor="items">Please select items that are on your cart</label>
    {items.map(( name ,index) => {
          return(
                // <li key={index}>
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={vendor.items}
                        checked={checked[index]}
                        onChange={() => handleItemChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  </div>
                // </li>
          );
            })}
     <button type="submit" onClick={handleSubmit}>
       Submit
     </button>
    </form>
     }
 
 
   
     
    </div>
  );
};


export default CreateVendor;
