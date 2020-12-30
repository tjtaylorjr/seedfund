import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { pathname } = useLocation();
  if (!props.authenticated && pathname !== "/signup") {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
