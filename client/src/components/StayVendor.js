import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const StayVendor = () => {
		const [vendor, setVendor] = useState("");
		const [customer, setCustomer] = useState("");
			const { id } = useParams();
			
			useEffect(() => {
				
axios.get(`http://localhost:4000/vendors/${id}`)
.then((res) =>{
	setVendor(res.data);
})}, [])

useEffect(() => {
axios.get("http://localhost:4000/customers")
.then((res) => {
	setCustomer(res.data);
})
})

// customer.map((cust) => {
// navigator.geolocation.watchPosition((pos) => {
// 	console.log(cust.latitude);
// })
// })


  return (
	  <div>
		<h1>
This is Stay Vendor
		</h1>
		{customer.map((cust) => {
			navigator.geolocation.watchPosition((pos) => {
				if(cust.latitude === pos.coords.latitude && cust.longitude === pos.coords.longitude)
				{
					<h3>They matched</h3>
				}
				else{
					<h3>They did not match</h3>

				}
			})
		})}
	</div>
  )
}

export default StayVendor;

