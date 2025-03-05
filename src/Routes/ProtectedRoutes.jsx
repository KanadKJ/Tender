import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const data = JSON.parse(user);
      setUserData(data);
    }
  }, []);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
