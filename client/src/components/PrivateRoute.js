import React, { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { myContext } from "./Context"

const PrivateRoute = () => {
    const userObject = useContext(myContext);

  return !userObject ? (
    <Navigate to="/login"/>
    ) : userObject ? (
      <Outlet />
      ): (
        
        <Navigate to="/login"/>
  );
};

export default PrivateRoute;