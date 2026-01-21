// todo: Registrazione (nome, email, password), Login, Logout
import React, { useState } from "react";
import BottomNav from "../components/Navbar";
import axios from "axios";
import API_BASE_URL from "../config/api";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

const Login = () => {
  const {login} = useAuth()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password)
    } catch (error: any) {
      console.log("Login error status:", error?.response?.status);
      console.log(
        "Login error body:",
        error?.response?.data ?? error?.message ?? error,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center items-center flex flex-col h-[80vh]">
      <form
        onSubmit={userLogin}
        className="flex flex-col items-center  bg-white p-4 rounded-lg w-[60vw] max-w-[600px]  "
      >
        <h1 className="text-lg text-shade font-bold">Welcome Back</h1>
        <div className="w-full md:px-8">
          <Input
            key={"email"}
            label={"Email"}
            onChange={setEmail}
            value={email}
            required={true}
            type={"email"}
          />
        </div>
        <div className="w-full md:px-8">
          <Input
            key={"pword"}
            label={"Password"}
            onChange={setPassword}
            value={password}
            required={true}
            type={"password"}
          />
        </div>
        <button className="bg-shade rounded-lg w-22 h-10 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
        type="submit">Submit</button>
      </form>
      <Link className="text-accent" 
      to={'/register'}>Don't have an account? Register Here</Link>

      
    </div>
  );
};

export default Login;
