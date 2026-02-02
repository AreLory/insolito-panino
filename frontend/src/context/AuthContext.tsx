import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
};

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const activeToken = localStorage.getItem("token");
    if (activeToken) {
      const decoded: JwtPayload = jwtDecode(activeToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        setToken(activeToken);
      } else {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (!token) return;

    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const timeLeft = decoded.exp - currentTime;

    if (timeLeft <= 0) {
      logout(); 
    } else {
      const timeout = setTimeout(() => {
        logout();
      }, timeLeft * 1000);

      return () => clearTimeout(timeout); 
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
