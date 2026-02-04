// todo: Registrazione (nome, email, password), Login, Logout
import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import axios from "axios";
import API_BASE_URL from "../config/api";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
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
    <div className="items-center flex flex-col h-screen">
      <div className="h-40 flex items-center flex-col mt-30">
        <h1 className="text-3xl text-shade font-bold">Welcome Back</h1>
        <p className="p-6 text-gray-500 text-center">
          Log in to explore your favourites Burgers and exclusive features
        </p>
      </div>
      <form
        onSubmit={userLogin}
        className="flex flex-col items-center  bg-white p-4 rounded-lg w-full max-w-[600px]  "
      >
        <Input
          key={"email"}
          label={"Email"}
          onChange={setEmail}
          value={email}
          required={true}
          type={"email"}
        />
        <Input
          key={"pword"}
          label={"Password"}
          onChange={setPassword}
          value={password}
          required={true}
          type={"password"}
        />

        <div className="mt-10 w-full">
          <button
            className="bg-shade rounded-full w-full h-12 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-accent">
        Don't have an account?{" "}
        <a href="/#/register" className="underline cursor-pointer">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default Login;
