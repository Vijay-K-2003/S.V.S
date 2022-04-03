import React, { useRef, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../index.css";
import '../../css/viewCustomer.css';
import "../assets/viewCustomer/DeleteIcon.svg";
import "../assets/viewCustomer/EditIcon.svg";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
toast.configure();
mapboxgl.accessToken = process.env.REACT_APP_MAPTOKEN;
const ViewCustomer = () => {
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    // if(map.current) return;
    console.log(map.current);
    map.current = map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  }, []);

  let navigate = useNavigate();
  const onDeleteCustomer = (id) => {
  
    axios.delete(`http://localhost:4000/customers/${id}/delete`).then((res) => {
      if(res.data)
      {
        setTimeout(() => {
          navigate("/");
          window.location.reload(false);
        }, 3000);
      
       
      }
    });
    return toast.success("Deleted Customer Successfully!", {position: toast.POSITION.BOTTOM_LEFT})

  };

  const { id } = useParams();

  useEffect(() => {

    axios.get(`http://localhost:4000/customers/${id}`).then(
      (res) => {
    setCustomer(res.data); // add conditional check

        // setCustomer(res.data);
        map.current.setCenter([customer.longitude, customer.latitude]);

        new mapboxgl.Marker()
          .setLngLat([customer.longitude, customer.latitude])
          .addTo(map.current)
          .catch((e) => {
            console.log("Error", e);
          });
        
      },
      [map.current, customer.email]
    ).catch((e) => {
      console.log(e);
    })
  });

  const handleEdit = () => {
    navigate(`edit`);
  }

  

  return (
    <div className="main-div-view">
 

 <div>
<div className="viewC-h1">
 <h1>View Customer</h1>
 </div>
 <div className="map-view">

 {/* <div className="sidebar">
   Longitude: {customer.latitude} | Latitude: {customer.longitude} |
   Zoom: {zoom}
 </div> */}
 
 
 <div ref={mapContainer} className="map-container" />
 </div>
 <div className="customer-details-flex">
   <div className="customer-details-inside">
 <h1>{customer.name}</h1>
 <h1>{customer.email}</h1>
 <h1>{customer.mobileNumber}</h1>
 <h3>Send message: "join me-silly" to "+14155238886" to recieve notifications about the vendors</h3>
 <div className="btn-split">
   <div className="left-side-view-c">
   <Link to={`/customers/${customer._id}/allVendor`}>
     <button className="all-vendors">All Vendors</button>
   </Link>
 
 
   <Link to={`/customers/${customer._id}/myVendors`}>
     <button className="my-vendors">My Vendors</button>
   </Link>
   </div>
   
 <div className="right-side-view-c">
 <button className="delete-btn" onClick={() => onDeleteCustomer(customer._id)}></button>

<button className="edit-btn" onClick={handleEdit}></button>

 </div>
  </div>
</div> 
 </div>
 </div>
 </div>
  );
};

export default ViewCustomer;
