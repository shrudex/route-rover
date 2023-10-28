import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, removeAuthToken, setAuthToken } from "../auth/authToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const user = decodeToken(token); //decodeToken to extract user info
      setUser(user);
    }
  }, []);

  const login = (token) => {
    const user = decodeToken(token);
    setUser(user);
    setAuthToken(token);
  };

  const logout = () => {
    setUser(null);
    removeAuthToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
