import React, { useState } from "react";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
};

const CreateCustomer = () => {
  const [customer, setCustomer] = useState(initialState);
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);

  const handleChange = (event) =>setCustomer((data) => ({
    ...data,
    [event.target.name]: event.target.value,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
    axios
      .post("http://localhost:4000/customers/new", customer)
      .then((res) => {});
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={customer.name} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={customer.email} onChange={handleChange} />
        <label htmlFor="mobileNumber">Mobile No.</label>
        <input
          type="tel"
          name="mobileNumber"
          id="mobileNumber"
          value={customer.mobileNumber}
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
