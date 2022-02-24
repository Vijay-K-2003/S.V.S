import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";

const StayVendor = () => {
	const [vendor, setVendor] = useState("");
	const [customer, setCustomer] = useState("");
	const { id } = useParams();
	const userObject = useContext(myContext)

	useEffect(() => {
		axios.get(`http://localhost:4000/vendors/${id}`).then((res) => {
			setVendor(res.data);
		});
	}, []);

	useEffect(() => {
		const customer = async() => {

			const res = await axios.get("http://localhost:4000/customers")
		
			setCustomer(res.data);
		  }
		 customer();
		
	}, []);


	
	

		// if(customer)
// console.log(customer[0].myVendors);
let navigate = useNavigate();
	function setGeolocation() {
		customer.map((cust) => {
		 const geolocation = window.navigator.geolocation.watchPosition((pos) => {
		if (
			cust.latitude === pos.coords.latitude &&
			cust.longitude === pos.coords.longitude
			
		) {
			// console.log("Matched");
		    // console.log(cust.myVendors);
			cust.myVendors.map((e) => {
				if(e._id === id && userObject.email === e.email) 
				{
					//Should notify customer that which particular vendor has come
					//We have send customer and vendor id from here 
				console.log("I am in view vendor");
				
					navigate(`${cust._id}/notify`);
				}
			})
			window.setTimeout( function () {
				navigator.geolocation.clearWatch( geolocation ) 
			}, 
			20000 //stop checking after 10 seconds
			);
		
		} else {
			// console.log("Not Matched")
		}
		
		
	});

});
	}
	if(customer)
	{

		setGeolocation();
	}
	
	if(customer){
	window.setInterval( function () {
			setGeolocation();
		}, 
		10000 //check every 15 seconds
	);
	}
	
	
	return (
		<div>
			<h1>
				We will inform the customer as soon as you get closer
			</h1>
			

		</div>
	);
};

export default StayVendor;