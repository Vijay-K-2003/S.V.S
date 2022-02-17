import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
		axios.get("http://localhost:4000/customers").then((res) => {
			setCustomer(res.data);
		});
	}, []);

	function watcher() {
		customer.map((cust) => {
			navigator.geolocation.watchPosition((pos) => {
				if (
					cust.latitude === pos.coords.latitude &&
					cust.longitude === pos.coords.longitude
				) {
					console.log("Matched");
				} else {
					console.log("Not Matched")
				}
			});
		});
	}
	if (customer) {
		setInterval(watcher, 10000);
	}

	return (
		<div>
			<h1>
				This is Stay Vendor
			</h1>

		</div>
	);
};

export default StayVendor;