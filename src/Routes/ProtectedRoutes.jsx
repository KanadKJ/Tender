import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../Redux/Slices/AuthSlice";

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthenticated = userData || localStorage.getItem("user");


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (localStorage.getItem("user") && !userData) {
    dispatch(setData(JSON.parse(localStorage.getItem("user"))));
  }

  return children;
}
