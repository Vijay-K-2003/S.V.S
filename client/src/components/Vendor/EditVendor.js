import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate,useParams } from "react-router-dom";



const initialState = {
  name: "",
  email: "",
  mobileNumber: "",

};


const EditVendor = () => {
  
  const [vendor, setVendor] = useState(initialState);
const userObject = useContext(myContext);

const {id} = useParams();
  const handleChange = (event) =>setVendor((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

  useEffect(() => {
    
    axios.get(`http://localhost:4000/vendors/${id}`)
    .then((res) =>{
        setVendor(res.data);
    })
    
    }, [])
    

let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    vendor.email = userObject.email;
navigate("/");
    axios
      .put(`http://localhost:4000/vendors/${id}/edit`, vendor)
      .then((res) => {
    
      console.log(res.data);
      });
  };

 
   
  

  return (
    <div>
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
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditVendor;