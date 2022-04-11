import React from "react";
import { Navigate, Route } from "react-router-dom";
import { getSession } from "../Hooks/Hook";

function ProtectedRoute() {
  const isAuthenticated = getSession("userinfo");
  console.log("this");

  
}

export default ProtectedRoute;