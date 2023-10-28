import React from "react";
import { useAuth } from "../context/AuthContext";
const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
