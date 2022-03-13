import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate,useParams } from "react-router-dom";
import FlashMessage from 'react-flash-message';


const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
  items: []
};


const EditVendor = () => {
  const items = ['Tomato', 'Potato', 'Carrot', 'Brinjal', 'Onion', 'Capsicum', 'Cabbage', 'Cauliflower', 'Lady finger', 'Apple', 'Banana', 'Grapes', 'Chiku', 'Pomegranate'];
  const [vendor, setVendor] = useState(initialState);
  const [checked, setChecked] = useState(
    new Array(items.length).fill(false)
);
const userObject = useContext(myContext);
const [message, showMessage] = useState(false);
const {id} = useParams();
  const handleChange = (event) =>setVendor((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

  const handleItemChange = (position) => {
    const updatedChecked = checked.map((item, index) =>
       position === index ? !item: item
    );

  
    setChecked(updatedChecked);
  };

 

    const defaultChecked = (vendor) => {
      const temp = new Array(items.length).fill(false);

      vendor && vendor.items.map((e, index) => {
         if(e)
         {
           let indx = items.indexOf(e);
        
            temp[indx] = true;
            
            
            
          }
        })
        setChecked(temp);
       
     }

 
 


  const addDeleteItems = (checked) => {
    vendor.items.splice(0, vendor.items.length)
    checked.map((e, index) => {
      if(e === true && !(vendor.items.includes(items[index])))
      {
        vendor.items.push(items[index]);
      }
      else if(e === false && vendor.items.includes(items[index])){
        vendor.items.splice(index)
      }
    })
  }

  useEffect(() => {
    // defaultChecked(vendor)
     axios.get(`http://localhost:4000/vendors/${id}`)
   .then((res) => {
     setVendor(res.data);
     defaultChecked(res.data)
   })

    
  
    }, [])
    

let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    vendor.email = userObject.email;
    addDeleteItems(checked);
console.log(vendor);
// navigate("/");
    axios
      .put(`http://localhost:4000/vendors/${id}/edit`, vendor)
      .then((res) => {
        showMessage(true);
        console.log(res.data);
      });
  };



  return (
    
    <div>
      {
        message === true ?
        (
          <FlashMessage duration={5000}>
            Vendor Edited Successfully
          </FlashMessage>
        ):
        (
          <form>
          <h1>Edit Vendor</h1>
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
<br />
<label htmlFor="items">Plesae select some items that you carry on your cart</label>
{ items.map(( name ,index) => {
      return(
            // <li key={index}>
        
              <div>
                <div>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    // value={}
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
          Update
        </button>
      </form>

        )
      }
          </div>
  );
};

export default EditVendor;
