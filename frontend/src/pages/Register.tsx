import React, { useState } from "react";
import axios from "axios";
import BottomNav from "../components/Navbar";
import API_BASE_URL from "../config/api";
import Input from "../components/Input";

export default function Register() {
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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center flex">
      <form
        onSubmit={userRegister}
        className="flex flex-col items-center bg-amber-200 rounded-lg w-[50vw] p-4"
      >
        <h1 className="text-2xl">Welcome</h1>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
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
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded w-20"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <BottomNav />
    </div>
  );
}
