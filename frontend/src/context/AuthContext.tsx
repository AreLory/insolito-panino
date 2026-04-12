import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { jwtDecode } from "jwt-decode";
import { connectSocket, disconnectSocket } from "../socket/socket";

type JwtPayload = {
  exp: number;
  id: string;
  role: "user" | "admin";
};

type AuthContextType = {
  token: string | null;
  role: "user" | "admin" | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activeToken = localStorage.getItem("token");
    if (activeToken) {
      const decoded: JwtPayload & { role?: string } = jwtDecode(activeToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp > currentTime) {
        setToken(activeToken);
        setRole(decoded.role);
        connectSocket(activeToken);
      } else {
        localStorage.removeItem("token");
        setToken(null);
        setRole(null);
      }
    } else {
      setToken(null);
      setRole(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    const token = response.data.token;
    const decoded: JwtPayload = jwtDecode(token);
    localStorage.setItem("token", token);
    setToken(token);
    setRole(decoded.role);
    connectSocket(token);
  };

  const logout = () => {
    disconnectSocket();
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
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
      value={{
        token,
        role,
        isAuthenticated: !!token,
        login,
        logout,
        isLoading,
      }}
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
