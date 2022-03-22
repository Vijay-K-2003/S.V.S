import React, { useContext, useState, useEffect } from "react";
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
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ViewCustomer from "./components/Customer/ViewCustomer";
import LoginPage from "./components/LoginPage";
import CustomerVendor from "./components/Customer/CustomerVendor";
import { myContext } from "./components/Context";
import YourVendor from "./components/Vendor/YourVendor";
import EditVendor from "./components/Vendor/EditVendor";
import EditCustomer from "./components/Customer/EditCustomer";
import MyCustomer from "./components/Vendor/MyCustomer";
import PrivateRoute from "./components/PrivateRoute";
import './css/App.css';

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

const getCustomer = async() => {
 const res = await axios.get("http://localhost:4000/customers")
 setCustomer(res.data);
}

userObject && customer && customer.map((e) => {
  if(e.email === userObject.email)
  {
    // c++;
    setIsCustomer(true);
  }
  console.log("Hi")
})
getCustomer();
},[userObject, myContext])


  useEffect(() => {

    const getVendor = async() => {
     const res = await axios.get("http://localhost:4000/vendors")
     setVendor(res.data);
    }
    
    userObject && vendor && vendor.map((e) => {
      if(e.email === userObject.email)
      {
        // c++;
        setIsVendor(true);
      }
      console.log("Hi")
    })
    getVendor();
      },[userObject, myContext])


  return (
    
    <div>
    
      <Router>
       
     {userObject && !isCustomer && !isVendor ? (
       <div className="navbar">
         
         {console.log(isCustomer)}
       <div> <Link to="/createCustomer" className="nav-link">Create a Customer</Link></div>
     <div><Link to="/createVendor" className="nav-link">Create a Vendor</Link> </div>

       <div> <Link to="/logout" onClick={handleLogout} className="nav-link">Logout</Link></div> 
       <div><a href="/" className="nav-link">Home</a></div>

       </div>
     ): userObject && isCustomer && !isVendor ? (
       <div className="navbar"> 
   
   <div><a href="/" className="nav-link">Home</a></div>
         <div> <Link to="/getCustomer" className="nav-link">Your Customer</Link></div>
     <div> <Link to="/logout" onClick={handleLogout} className="nav-link">Logout</Link></div> 

     </div>
     ): userObject && !isCustomer ?(
       <div className="navbar">
         <div><Link to="/getVendor" className="nav-link">Your Vendor</Link></div>
      <div> <Link to="/logout" onClick={handleLogout} className="nav-link">Logout</Link></div> 
      <div><a href="/" className="nav-link">Home</a></div>

      </div>
     ): 
     <div className="navbar">
     <div><Link to="/login" className="nav-link">Login</Link></div>
     <div><Link to="/createCustomer" className="nav-link">Create a Customer</Link></div>
     <div> <Link to="/createVendor" className="nav-link">Create a Vendor</Link></div>
     </div>}
          

          
      

        <Routes>
     
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>

            <Route element={<PrivateRoute/>}>
        
            
              
            <Route path="getCustomer" element={<YourCustomer/>}></Route>
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
       
            </Route>
   
   
        </Routes>
      </Router>
    </div>
  );
}
export default App;
