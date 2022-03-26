import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate,useParams } from "react-router-dom";
import createVendor from "../assets/createVendor/createVendor.svg";
import rectangle from "../assets/createVendor/rectangle.svg";
import "../../css/EditVendor.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


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
    


  const handleSubmit = (e) => {
    e.preventDefault();
    vendor.email = userObject.email;
    addDeleteItems(checked);

    axios
      .put(`http://localhost:4000/vendors/${id}/edit`, vendor)
      .then((res) => {
        console.log(res.data);
        

      });
      return toast.success("Updated Vendor Successfully! Click on Home on the navbar to continue...", {position: toast.POSITION.BOTTOM_LEFT})

  };



  return (
    
    <div>
      
          <form>
           <div className="main-div">
          <div className="form-div">
            <form className="main-form">
              <div className="form-h1-flex">
                <h1 className="form-h1">Edit Vendor</h1>
              </div>
              <div className="form-margin">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-input"
                type="text"
                name="name"
                id="name"
                value={vendor.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <br />
              </div>
        <div className="form-margin">
              <label className="form-label" htmlFor="mobileNumber">
                Mobile No.
              </label>
              <input
                type="tel"
                name="mobileNumber"
                id="mobileNumber"
                value={vendor.mobileNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="+91-000-000-0000"
              />
          </div>
              <div className="form-area-div">
                <label className="form-label-area" htmlFor="area">
                  Please select area where you spend maximum time of the day
                </label>

                <select
                  className="form-input-area"
                  name="area"
                  value={vendor.area}
                  onChange={handleChange}
                  id="area"
                >
                  <option value="areas">Area</option>
                  <option value="ambavadi">Ambavadi</option>
                  <option value="bhadaj">Bhadaj</option>
                  <option value="ghodasar">Ghodasar</option>
                  <option value="naranpura">Naranpura</option>
                  <option value="vastrapura">Vastrapur</option>
                  <option value="prahladnagar">Prahladnagar</option>
                </select>

            
              </div>
              <div className="checkbox-label-div">
                <label className="form-label-checkbox" htmlFor="items">
                  Please select items that are on your cart
                </label>
              </div>
          
              <div className="main-three-row">
                <div className="first-halve">
                  {items.map((name, index) => {
                    return index < items.length / 2 ? (
                      <div className="checkbox-item">
                        <div className="c-input2">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={vendor.items}
                          checked={checked[index]}
                          onChange={() => handleItemChange(index)}
                          className="checkbox-round"
                        />
                        </div>

                        <label
                          className="checkbox-label"
                          htmlFor={`custom-checkbox-${index}`}
                        >
                          {name}
                        </label>
                      </div>
                    ) : null;
                  })}
                </div>
      <div className="img-rectangle">
                <img src={rectangle} alt="rectangle" className="rectangle" />
</div>
                <div className="second-half">
                  {items.map((name, index) => {
                    return index >= items.length / 2 ? (
                      <div className="checkbox-item">
                        <div className="c-input">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={vendor.items}
                          checked={checked[index]}
                          onChange={() => handleItemChange(index)}
                          className="checkbox-round"
                        />
                        </div>
                        <div className="c-label">

                        <label
                          className="checkbox-label"
                          htmlFor={`custom-checkbox-${index}`}
                        >
                          {name}
                        </label>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
          

              <div className="btn-flex">
                <button
                  className="submit-btn"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="image-div">
            <img className="image" src={createVendor} alt="createVendor" />
          </div>
        </div>
      </form>

        
      
          </div>
  );
};

export default EditVendor;
