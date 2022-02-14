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
import LoginPage from "./components/LoginPage";
import Hello from "./components/Hello";
// mapboxgl.accessToken = process.env.REACT_APP_MAPTOKEN;


function App() {



  return (
    <div>
  
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
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      <Routes>
        <Route path="login" element={<LoginPage/>}></Route>
        <Route path="getCustomers" element={<AllCustomers/>}></Route>
        <Route path="createCustomer" element={<CreateCustomer/>}></Route>
        {/* <Route path="getVendors" element={<AllVendors/>}></Route> */}
        <Route path="createVendor" element={<CreateVendor/>}></Route>
        <Route path="/customers/:id" element={<ViewCustomer/>} />
        <Route path="/customers/:id/allVendor" element={<AllVendors />}/>
        <Route path="/customers/:id/allVendor/:venid" element={<Hello />} />
      </Routes>
      </Router>
    </div>
  );
}
export default App;
