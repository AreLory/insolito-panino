//Hooks
import React, { useState } from "react";

import axios from "axios";
import API_BASE_URL from "../config/api";
import { redirect } from "react-router";
//Components
import Input from "../components/Input";

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
    <div className="items-center flex flex-col h-screen">
      <div className="h-30 flex items-center flex-col mt-10">
        <h1 className="text-3xl text-shade font-bold">Welcome!</h1>
        <p className="p-6 text-gray-500 text-center">
          Sign up to explore your favourites Burgers and exclusive features
        </p>
      </div>
      <form
        onSubmit={userRegister}
        className="flex flex-col items-center  bg-white p-4 rounded-lg w-full max-w-150  "
      >
        <div className="w-full md:grid md:gap-x-6 md:mb-6 md:grid-cols-2">
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
        </div>
        <div className="mt-10 w-full">
          <button
            className="bg-shade rounded-full w-full h-12 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-accent">
        You already have an account?{" "}
        <a href="/#/" className="underline cursor-pointer">
          Login Here
        </a>
      </p>
    </div>
  );
}
