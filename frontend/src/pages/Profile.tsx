import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

import Input from "../components/shared/Input";
import MiniNavBar from "../components/shared/MiniNavBar";
import Loader from "../components/shared/Loader";

import { api } from "../config/axios";

import type IProfile from "../types/profile";

import { ArrowLeft, Home } from "lucide-react";

export default function Profile() {
  const { logout } = useAuth();
  const { showAlert } = useAlert();

  const [user, setUser] = useState<IProfile | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<IProfile>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      value: form.fullName,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      value: form.email,
      type: "email",
      required: true,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      value: form.phoneNumber,
      optional: true,
    },
    {
      label: "Address",
      name: "address",
      value: form.address,
      optional: true,
    },
  ];

  const mapUserToForm = (user: IProfile) => ({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
  });

  const getInfo = async () => {
    setLoading(true);
    try {
      const profileInfo = await api.get("/users/me");
      const { fullName, email, phoneNumber, address }: IProfile =
        profileInfo.data;

      setUser({ fullName, email, phoneNumber, address });
    } catch (error) {
      console.log("Error", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { fullName, email, phoneNumber, address } = form;
      if (password || confirmPassword) {
        if (password !== confirmPassword) {
          showAlert("warning", "Passwords do not match");
          setLoading(false);
          return;
        }
      }

      const payload: any = {
        fullName,
        email,
        phoneNumber,
        address,
      };

      if (password.trim() !== "") {
        payload.password = password;
      }
      const response = await api.patch("/users/me", payload);
      setUser(response.data);
      showAlert("success", "Profile successfully updated");
      setIsEditing(false);
    } catch (error) {
      showAlert("error", `Failed to update profile. Please try again`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    setForm((prevForm) => ({
      ...prevForm,
      ...mapUserToForm(user),
    }));
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    if (!user) return;
    setForm(mapUserToForm(user));
    setPassword("");
    showAlert("info", "Edit action canceled");
    setIsEditing(false);
  };

  
  if (loading) return <Loader/>

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <MiniNavBar
        leftChild={<ArrowLeft />}
        pageName="Your Profile"
        rightChild={<Home />}
        goTo="/"
        goBack="/"
      />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <form
          onSubmit={updateUser}
        >
          <h1 className="text-3xl text-shade font-bold text-center">
            Your Profile
          </h1>
          {fields.map((field) => (
            <Input
              key={field.label}
              label={`${field.label} ${field.optional ? "(optional)" : ""}`}
              onChange={(v: string) =>
                field.name === "password"
                  ? setPassword(v)
                  : handleChange(field.name, v)
              }
              value={field.value}
              required={field.required}
              type={field.type || "text"}
              readonly={!isEditing}
            />
          ))}
          {isEditing && (
            <div className="mt-2">
              <Input
                label="Password (optional)"
                type="password"
                value={password}
                onChange={(v: string) => setPassword(v)}
              />
              <p className="text-sm text-gray-400 mb-2">
                Leave blank to keep current password
              </p>
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(v: string) => setConfirmPassword(v)}
              />
            </div>
          )}

          {isEditing && (
            <div className="mt-6">
              <button
                type="submit"
                className="w-full mt-6 px-4 py-2.5 bg-linear-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:to-purple-700 transition-colors duration-200"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => handleCancel()}
                className="w-full mt-6 px-4 py-2.5  bg-linear-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:to-red-700 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          ) }
        </form>
         {!isEditing && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
                className="w-full mt-6 px-4 py-2.5  bg-linear-to-r from-purple-600 to-blue-500 hover:to-purple-700  text-white rounded-lg font-medium transition-colors duration-200"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                }}
                className="w-full mt-6 px-4 py-2.5  bg-linear-to-r from-red-600 to-orange-600 hover:bg-red-700 text-white rounded-lg font-medium  transition-colors duration-200"
              >
                Log out
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
