import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";




const customers = () => {
const [inputs, setInputs] = useState({});

const handleSubmit = (event) => {
    event.preventDefault();

}

const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
}
    return <div>
      <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name
          <input type="text"
          name='username'
          value={inputs.username || ""}
          onChange={handleChange} />
          </label>
          <button type='submit'>Submit</button>
      </form>
  </div>;
};

export default customers;
