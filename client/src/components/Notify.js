import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Notify.css";
import notifylogo from "./assets/notifylogo.png";

const Notify = () => {
  const [customer, setCustomer] = useState("");
  const [vendor, setVendor] = useState("");

  const { id, venid } = useParams();

  useEffect(() => {
    const cust = async () => {
      const res = await axios.get(`http://localhost:4000/customers/${id}`);
      setCustomer(res.data);
    };
    cust();
  }, [id]);

  useEffect(() => {
    const ven = async () => {
      const res = await axios.get(`http://localhost:4000/vendors/${venid}`);
      setVendor(res.data);
    };
    ven();
  }, [venid]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/customers/${id}/notify/${venid}`)
      .then((res) => {
        if (res.data === "Done") {
          console.log("Yes");
        }
      });
  }, [id, venid]);

  return (
    <div>
      <div className="containerss">
        <div className="info">
          <h1>Notification has been send to your costomer :{customer.name}</h1>
        </div>
        <div className="img">
          <img src={notifylogo} alt="notifylogo.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Notify;
