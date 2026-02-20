//Hooks
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

//Component
import Input from "../components/shared/Input";

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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <form onSubmit={userLogin} className="bg-white rounded-2xl shadow-xl p-8 w-full">
          <h1 className="text-3xl text-shade font-bold text-center">Welcome back!</h1>
          <p className="text-gray-500 text-center">Log in here for fantastic features</p>
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

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Log in
          </button>
        </form>
        <p className="text-accent">
          You don't have an account?{" "}
          <a href="/#/register" className="underline cursor-pointer">
            Sign here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
