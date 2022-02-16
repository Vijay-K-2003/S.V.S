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

// console.log(customer);
// customer.map((cust) => {
// navigator.geolocation.watchPosition((pos) => {
// 	console.log(cust.latitude);
// })
// })


  return (
	  <div>
		<h1>
This is Stay Vendor
{/* {console.log(customer)} */}
		</h1>
		{customer && customer.map((cust) => {
			navigator.geolocation.watchPosition((pos) => {
				if(cust.latitude === pos.coords.latitude && cust.longitude === pos.coords.longitude)
				{
					// <h3>They matched</h3>
					// console.log("Matched");
				}
				else{
					// <h3>They did not match</h3>
					// console.log("Not Matched")
					// console.log(pos.coords.latitude);

				}
			})
			// console.log(cust);
		})}
	</div>
  )
}

export default StayVendor;

