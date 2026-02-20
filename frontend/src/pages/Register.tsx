//Hooks
import React, { useState } from "react";

import axios from "axios";
import API_BASE_URL from "../config/api";
import { redirect } from "react-router";
//Components
import Input from "../components/shared/Input";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");

  const [loading, setLoading] = useState(false);

  const fields = [
    {
      label: "Full Name",
      value: fullName,
      setter: setFullName,
      required: true,
    },
    { label: "Email", value: email, setter: setEmail, required: true },
    {
      label: "Password",
      value: password,
      setter: setPassword,
      required: true,
      type: "password",
    },
    {
      label: "Phone Number (optional)",
      value: phoneNumber,
      setter: setPhoneNumber,
    },
    { label: "Street Name (optional)", value: street, setter: setStreet },
  ];

  const userRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        fullName,
        phoneNumber,
        street,
        email,
        password,
      });
      redirect("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <form onSubmit={userRegister} className="bg-white rounded-2xl shadow-xl p-8 w-full">
          <h1 className="text-3xl text-shade font-bold text-center">
            Sign Up
          </h1>
          <p className="text-gray-500 text-center">Register here for order</p>
          {fields.map((field) => (
            <Input
              key={field.label}
              label={field.label}
              onChange={field.setter}
              value={field.value}
              required={field.required}
              type={field.type || "text"}
            />
          ))}

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Save
          </button>
        </form>
        <p className="text-accent">
          You already have an account?{" "}
          <a href="/#/" className="underline cursor-pointer">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
}
