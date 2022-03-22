import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext } from "../Context";
import { useNavigate } from "react-router";
import FlashMessage from "react-flash-message";
import createVendor from "../assets/createVendor/createVendor.svg";
import rectangle from "../assets/createVendor/rectangle.svg";
import "../../css/createVendor.css";
import "../assets/createVendor/Vector.svg";

const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
  area: "",
  items: [],
};

const CreateVendor = () => {
  const items = [
    "Tomato",
    "Potato",
    "Carrot",
    "Brinjal",
    "Onion",
    "Capsicum",
    "Cabbage",
    "Cauliflower",
    "Lady finger",
    "Apple",
    "Banana",
    "Grapes",
    "Chiku",
    "Pomegranate",
  ];
  const [vendor, setVendor] = useState(initialState);
  const [checked, setChecked] = useState(new Array(items.length).fill(false));
  const [cus, setCus] = useState("");
  const [ven, setVen] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const userObject = useContext(myContext);
  const [message, showMessage] = useState(false);

  const handleChange = (event) =>
    setVendor((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));

  const handleItemChange = (position) => {
    const updatedChecked = checked.map((item, index) =>
      position === index ? !item : item
    );

    setChecked(updatedChecked);
  };
  useEffect(() => {
    axios.get("http://localhost:4000/customers").then((res) => {
      setCus(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/vendors").then((res) => {
      setVen(res.data);
    });
  }, []);

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
      if (e && !vendor.items.includes(items[index])) {
        vendor.items.push(items[index]);
      }
    });
  };
  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(vendor);
      // navigate("/");
      axios.post("http://localhost:4000/vendors/new", vendor).then((res) => {
        showMessage(true);
        console.log(res.data);
      });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    const regexM = /^((\+91)?)?[6789][0-9]{9}/;
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile No. is required";
    } else if (!values.mobileNumber.match(regexM)) {
      errors.mobileNumber = "Please enter a valid Mobile No.";
    }
    if (!values.area || values.area === "Area") {
      errors.area = "Please select a preffered area";
    }

    return errors;
  };

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

      {message === true && Object.keys(formErrors).length === 0 ? (
        <div>
          <FlashMessage duration={5000}>
            <div>Created Vendor Successfully!</div>
          </FlashMessage>
        </div>
      ) : (
        <div className="main-div">
          <div className="form-div">
            <form className="main-form">
              <div className="form-h1-flex">
                <h1 className="form-h1">Create a Vendor</h1>
              </div>
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
              <p className="form-errors">{formErrors.name}</p>
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
              <p className="form-errors">{formErrors.mobileNumber}</p>
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

                <p className="form-errors">{formErrors.area}</p>
              </div>
              <div className="checkbox-label-div">
                <label className="form-label-checkbox" htmlFor="items">
                  Please select items that are on your cart
                </label>
              </div>
              {/* <div className="checkbox-flex"> */}

              {/* <div className="checkbox-wrapper"> */}
              {/* {items.map((name, index) => {
                  return (
                    
                    <div className="checkbox-item">
                    <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={vendor.items}
                    checked={checked[index]}
                    onChange={() => handleItemChange(index)}
                    className="checkbox-round"
                    />
                    
                    <label
                    className="checkbox-label"
                    htmlFor={`custom-checkbox-${index}`}>{name}
                    </label>
                    </div>
                    
                    
                    
                    );
                  })} */}
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
              {/* </div> */}
              {/* </div> */}

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
      )}
    </div>
  );
};

export default CreateVendor;
