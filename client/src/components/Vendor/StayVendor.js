import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StayVendor = () => {
	const [vendor, setVendor] = useState("");
	const [customer, setCustomer] = useState("");
	const { id } = useParams();

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

	const onDeleteVendor = () => {
		const deleteVendor = async () => {
               const res = await axios.delete(`http://localhost:4000/vendors/${id}`)
			   window.location.href = "https://localhost:3000";
		}
	}

let navigate = useNavigate();
		// if(customer)
// console.log(customer[0].myVendors);
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
				if(e._id === id) 
				{
					//Should notify customer that which particular vendor has come
					//We have send customer and vendor id from here 
					console.log("Vendor exist in customer");
				    //  axios.get(`http:localhost:4000/customers/${cust._id}/notify/${id}`);
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
				This is Stay vendor
			</h1>
			<button onClick={() => onDeleteVendor()}>Delete</button>

		</div>
	);
};

export default StayVendor;