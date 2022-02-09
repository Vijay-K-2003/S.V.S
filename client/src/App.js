import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import AllCustomers from "./components/AllCustomers";
import CreateCustomer from "./components/CreateCustomer";
import AllVendors from "./components/AllVendors";
import CreateVendor from "./components/CreateVendor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ViewCustomer from "./components/ViewCustomer";

// mapboxgl.accessToken = process.env.REACT_APP_MAPTOKEN;


function App() {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);

  // useEffect(() => {
    
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // }, []);

  // useEffect(() => {
    
  //   map.current.addControl(
  //     map.current = new mapboxgl.GeolocateControl({
  //     positionOptions: {
  //     enableHighAccuracy: true
  //     },
  //     // When active the map will receive updates to the device's location as it changes.
  //     trackUserLocation: true,
  //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
  //     showUserHeading: true
  //     })
  //     );
     
  // });


  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" /> */}
      <Router>
        <ul>
          <li>
            <Link to="/getCustomers">All Customers</Link>

          </li>
          <li>
            <Link to="/createCustomer">Create a Customer</Link>
          </li>
          <li>
            <Link to="/getVendors">All Vendors</Link>
          </li>
          <li>
            <Link to="/createVendor">Create a Vendor</Link>
          </li>
        </ul>
      <Routes>
        <Route path="getCustomers" element={<AllCustomers/>}></Route>
        <Route path="createCustomer" element={<CreateCustomer/>}></Route>
        <Route path="getVendors" element={<AllVendors/>}></Route>
        <Route path="createVendor" element={<CreateVendor/>}></Route>
        <Route path="/customers/:id" element={<ViewCustomer/>} />


      </Routes>
      </Router>
    </div>
  );
}
export default App;
