import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import API_BASE_URL from "../config/api";
import Input from "../components/Input";
import { redirect } from "react-router";

export default function UpdateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [numberAddress, setNumberAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      label: "First Name",
      value: firstName,
      setter: setFirstName,
      required: true,
    },
    {
      label: "Last Name",
      value: lastName,
      setter: setLastName,
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
    {
      label: "House Number (optional)",
      value: numberAddress,
      setter: setNumberAddress,
    },
  ];

  const userRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstName,
        lastName,
        phoneNumber,
        address: {
          street,
          number: numberAddress,
        },
        email,
        password,
      });
      redirect('/')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center items-center flex flex-col h-[90vh]">
      <form
        onSubmit={userRegister}
        className="flex flex-col items-center  bg-white p-4 rounded-lg w-[60vw] max-w-[600px] "
      >
        <h1 className="text-lg text-shade font-bold">Update User</h1>
        <div className="grid gap-x-6 mb-6 md:grid-cols-2">
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
        <button
            type="submit"
            disabled={loading}
            className="bg-shade rounded-lg w-22 h-10 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
          >
            {loading ? "Loading..." : "Submit"}
          </button>

      </form>
    </div>
  );
}
