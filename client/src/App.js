import React, {useContext } from "react";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import AllCustomers from "./components/Customer/AllCustomers";
import CreateCustomer from "./components/Customer/CreateCustomer";
import AllVendors from "./components/Vendor/AllVendors";
import CreateVendor from "./components/Vendor/CreateVendor";
import HomePage from "./components/HomePage";
import StayVendor from "./components/Vendor/StayVendor";
import Notify from "./components/Notify";

import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ViewCustomer from "./components/Customer/ViewCustomer";
import LoginPage from "./components/LoginPage";
import CustomerVendor from "./components/Customer/CustomerVendor";
import { myContext } from "./components/Context";

// mapboxgl.accessToken = process.env.REACT_APP_MAPTOKEN;


function App() {


const userObject = useContext(myContext);
console.log(userObject);



const handleLogout = () => {
      axios.get("http://localhost:4000/logout", {withCredentials:true})
      .then((res) => {
        if(res.data === "success")
        {
          window.location.href = "/";
        }
      })
}

  return (

    
    <div>
  
      <Router>
        {userObject ? (
 <>
 <ul>
  
   <li>
     <Link to="/getCustomers">All Customers</Link>

   </li>
   <li>
     <Link to="/createCustomer">Create a Customer</Link>
   </li>
   {/* <li>
     <Link to="/getVendors">All Vendors</Link>
   </li> */}
   <li>
     <Link to="/createVendor">Create a Vendor</Link>
   </li>
  
   <li>
     <Link to="/logout" onClick={handleLogout}>Logout</Link>
   </li>
   </ul>
   </>
        ): (
          <>
<ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        </>
        )}
         
      <Routes>
       {userObject ? (

     
         <>
      <Route path="/" element={<HomePage/>}></Route>
       
        <Route path="getCustomers" element={<AllCustomers/>}></Route>
        <Route path="createCustomer" element={<CreateCustomer/>}></Route>
        {/* <Route path="getVendors" element={<AllVendors/>}></Route> */}
        <Route path="createVendor" element={<CreateVendor/>}></Route>
        <Route path="/customers/:id/allVendor" element={<AllVendors />}/>
        <Route path="/customers/:id/allVendor/:venid" element={<CustomerVendor />} />
        <Route path="/customers/:id" element={<ViewCustomer/>} />
        <Route path="/customers/:id/myVendors" element={<CustomerVendor/>} />
        <Route path="/vendors/:id" element={<StayVendor/>} />
        <Route path="vendors/:venid/:id/notify" element={<Notify/>} />
        </>
        ): (
          <Route path="login" element={<LoginPage/>}></Route>
          )}
   
      </Routes>
      </Router>
    </div>
  );
}
export default App;
