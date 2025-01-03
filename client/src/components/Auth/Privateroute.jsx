import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../../Context/Authprovider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated:", isAuthenticated);

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
