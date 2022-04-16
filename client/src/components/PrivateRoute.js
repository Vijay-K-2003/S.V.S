import React, {useState, useEffect} from "react";
import { Navigate, Outlet} from "react-router-dom";
import axios from "axios";


const PrivateRoute = () => {

  const [user, setUser] = useState({});
  
  useEffect(() => {
    const getUser = async() => {
   
     const res =  await axios.get("http://localhost:4000/getUser", {withCredentials: true});
     console.log(res.data);
     setUser(res.data);
    }
    getUser();
    
   }, [])

    console.log(user)
  return user ? (
    <Outlet />
    ) : (
      <Navigate to="/login"/>
      )
};

export default PrivateRoute;