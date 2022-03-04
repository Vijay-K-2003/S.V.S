import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YourCustomer from "./components/Customer/YourCustomer";
import CreateCustomer from "./components/Customer/CreateCustomer";
import AllVendors from "./components/Vendor/AllVendors";
import CreateVendor from "./components/Vendor/CreateVendor";
import ViewVendor from "./components/Vendor/ViewVendor";
import HomePage from "./components/HomePage";
import StayVendor from "./components/Vendor/StayVendor";
import Notify from "./components/Notify";
import Error from "./components/Error";
import Flash from "./components/Flash";

import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewCustomer from "./components/Customer/ViewCustomer";
import LoginPage from "./components/LoginPage";
import CustomerVendor from "./components/Customer/CustomerVendor";
import { myContext } from "./components/Context";
import YourVendor from "./components/Vendor/YourVendor";
import EditVendor from "./components/Vendor/EditVendor";
import EditCustomer from "./components/Customer/EditCustomer";
import MyCustomer from "./components/Vendor/MyCustomer";

function App() {
  const userObject = useContext(myContext);

  const [customer, setCustomer] = useState("");
  const [vendor, setVendor] = useState("");
  const [isCustomer, setIsCustomer] = useState(false);
  const [isVendor, setIsVendor] = useState(false);

  const handleLogout = () => {
    axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((res) => {
        if (res.data === "success") {
          window.location.href = "/";
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/customers")
    .then((res) => {
      setCustomer(res.data);
      setIsCustomer(true);
    })
  
   
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/vendors")
    .then((res) => {
      setVendor(res.data);
      setIsVendor(true);
    })
  
   
  }, [])


  

  return (
    <div>
      <Router>

    {userObject && isVendor && isCustomer? (
      <div>
<div><Link to="/createCustomer">Create a Customer</Link></div>
         
         <div>  <Link to="/createVendor">Create a Vendor</Link></div>
  <div> <Link to="/getCustomer">Your Customer</Link></div>


        <div> <Link to="/getVendor">Your Vendor</Link></div>
      <div> <Link to="/logout" onClick={handleLogout}>Logout</Link></div> 
      </div>
    ):  <div>
    <div><Link to="/login">Login</Link></div>
    <div><Link to="/createCustomer">Create a Customer</Link></div>
         
    <div>  <Link to="/createVendor">Create a Vendor</Link></div>
    </div>}
      
         
                        
     
                        
      {/* {userObject && isCustomer === false && isVendor === false} ? (
        <>
            <div><Link to="/createCustomer">Create a Customer</Link></div>
            <Link to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
            <div>  <Link to="/createVendor">Create a Vendor</Link></div>
          
        ): {userObject && isCustomer === true && isVendor === false} ? (
          <div> <Link to="/getCustomer">Your Customer</Link></div>
          <Link to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
        ): {userObject && isCustomer === false && isVendor === true} ? (
          <div> <Link to="/getVendor">Your Vendor</Link></div>
          <Link to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
        ): {!userObject} ? (
          <div><Link to="/login">Login</Link></div>
          </>
        ) */}
{/* 
        {userObject && !(isCustomer) && !(isVendor) ? (
          <div>
           <div><Link to="/createCustomer">Create a Customer</Link></div>
           <Link to="/logout" onClick={handleLogout}>
                 Logout
               </Link>
           <div>  <Link to="/createVendor">Create a Vendor</Link></div>
           </div>
        ): <div><div><Link to="/logout" onClick={handleLogout}>
        Logout
      </Link></div>
     </div>} */}
     {/* {userObject ? (
       console.log(userObject)
     ): "Kuch nai"} */}
          

          
      

        <Routes>
         {userObject ? (
            <>
            <Route path="/" element={<HomePage />}></Route>

            <Route path="getCustomer" element={<YourCustomer />}></Route>
            <Route path="createCustomer" element={<CreateCustomer />}></Route>
        
            <Route path="createVendor" element={<CreateVendor />}></Route>
            <Route path="/customers/:id/allVendor" element={<AllVendors />} />
          
            <Route path="/customers/:id" element={<ViewCustomer />} />
            <Route path="/customers/:id/edit" element={<EditCustomer />} />
            <Route path="/vendors/:id/edit" element={<EditVendor />} />
            <Route
              path="/customers/:id/myVendors"
              element={<CustomerVendor />}
            />
            <Route path="getVendor" element={<YourVendor />} />
            <Route path="vendors/:id" element={<ViewVendor />} />

            <Route path="/vendors/:id/locate" element={<StayVendor />} />
            <Route path="/vendors/:venid/locate/:id/notify" element={<Notify />} />
            <Route path="/vendors/:id/myCustomers" element={<MyCustomer />} />
            <Route path="/error" element={<Error />} />
            <Route path="/flash" element={<Flash />} />
          </>
         ): 
         <Route path="login" element={<LoginPage />}>
       
           </Route>}
           
    
            
   
        </Routes>
      </Router>
    </div>
  );
}
export default App;
