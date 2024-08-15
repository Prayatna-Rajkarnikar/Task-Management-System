import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const register = async (userData) => {
    const response = await axios.post("/user/register", userData);
    setUser(response.data.user);
    setToken(response.data.token);
  };
  const login = async (userData) => {
    try {
      const response = await axios.post("/user/login", userData);
      setToken(response.data.token);
      setUser({
        id: response.data.user.id,
        username: response.data.user.username,
      });
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
