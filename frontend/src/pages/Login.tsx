// todo: Registrazione (nome, email, password), Login, Logout
import React, { useState } from "react";
import BottomNav from "../components/Navbar";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log("Login error status:", error?.response?.status);
      console.log("Login error body:", error?.response?.data ?? error?.message ?? error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center flex">
      <form
        onSubmit={userLogin}
        className="flex flex-col items-center bg-amber-200 rounded-lg"
      >
        <h1 className="text-2xl">Welcome Back</h1>
        <div>
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Email
          </label>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="nomecognome123@example.com"
            required
          />
        </div>
        <div>
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Password
          </label>
          <input
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <BottomNav />
    </div>
  );
};

export default Login;
