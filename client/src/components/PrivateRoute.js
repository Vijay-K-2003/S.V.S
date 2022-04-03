import React, { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { myContext } from "./Context"

const PrivateRoute = () => {
    const userObject = useContext(myContext);

    console.log(userObject)
  return !userObject ? (
    <Navigate to="/login"/>
    ) : (
      <Outlet />
    )
};

export default PrivateRoute;