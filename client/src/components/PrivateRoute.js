import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { myContext } from "./Context"

const PrivateRoute = () => {
    const userObject = useContext(myContext);

  const location = useLocation();

  return userObject ? (
    <Outlet />
  ) : (
    
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;