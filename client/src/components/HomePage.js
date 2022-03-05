import React, { useContext, useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import { myContext } from "./Context";

const HomePage = () => {
  const context = useContext(myContext);
  const [customer, setCustomer] = useState("");
  const [vendor, setVendor] = useState("");
  const [isCustomer, setIsCustomer] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:4000/customers")
    .then((res) => {
      setCustomer(res.data);
     
    
    })
  
checkCustomer();
   
  }, [])


  useEffect(() => {
    axios.get("http://localhost:4000/vendors")
    .then((res) => {
      setVendor(res.data);
 
      
    })
  
   
  }, [])

  

const location = useLocation();
useEffect(() => {
checkCustomer();
  
}, [location])
const checkCustomer = () => {

  
if(context.email !== "" && customer)
{
  console.log(customer);
  // customer.map((e) => {
  //   if(e.email === context.email)
  //   {
  //     console.log("f")
  //    setIsCustomer(true);
  //   }

  
}
  
}

// const checkVendor = (context, vendor) => {
//   vendor && vendor.map((e) => {
//     if(e.email === context.email)
//     {
//       setIsVendor(true);
//     }
//   })
//   }

  const handleLogout = () => {
    axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((res) => {
        if (res.data === "success") {
          window.location.href = "/";
        }
      });
  };
// console.log(isCustomer);

  return (
    
  
    <div>
     {/* {customer && customer.map((e) => {
       if(context.email === e.email)
       {
         setIsCustomer(true);
       }
     })} */}
    
      {console.log(isCustomer)}
      {context && !isCustomer && !isVendor ? (
        <div>
        <h1>Welcome to our website, {context.username}</h1>
         <div><Link to="/createCustomer">Create a Customer</Link></div>
         <div>  <Link to="/createVendor">Create a Vendor</Link></div>
         <div> <Link to="/logout" onClick={handleLogout}>Logout</Link></div> 
         <div> <Link to="/getCustomer">Your Customer</Link></div>

         </div>
      ) : context && isCustomer && !isVendor ? (
        <div>
        <h1>Hello </h1>
        <div> <Link to="/getCustomer">Your Customer</Link></div>
        <div> <Link to="/logout" onClick={handleLogout}>Logout</Link></div> 

        </div>
      )
      (
     
      ): <div>
      <h1>Welcome to our website</h1>
      <div><Link to="/login">Login</Link></div>
      </div> 
    }
    </div>
  );
};

export default HomePage;
