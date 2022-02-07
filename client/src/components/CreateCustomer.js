import React, { useState} from "react";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  mobileNumber: 0,
};

const CreateCustomer = () => {
  const [customer, setCustomer] = useState(initialState);
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...initialState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/customer/new", initialState
    .then((res) => {
      setCustomer([
        ...customer,
        {
          name: "",
          email: "",
          mobileNumber: 0
        }
      ]);
    })
    )
   
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" onChange={handleChange} />
        <label htmlFor="mobileNumber">Mobile No.</label>
        <input
          type="number"
          name="number"
          id="mobileNumber"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;

