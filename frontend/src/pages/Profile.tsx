//Hooks
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../config/axios";
//Interfaces
import type IProfile from "../types/profile";
//components
import Input from "../components/shared/Input";





export default function Profile() {
  const {logout} = useAuth()
  
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

  const mapUserToForm = (user: IProfile) => ({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
  });

  const getInfo = async () => {
    try {
      const profileInfo = await api.get("/users/me");
      const { fullName, email, phoneNumber, address }: IProfile =
        profileInfo.data;

      setUser({ fullName, email, phoneNumber, address });
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (!user) return;

    setForm(mapUserToForm(user));
  }, [user]);

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

  const handleChange = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { fullName, email, phoneNumber, address } = form;
      if (password || confirmPassword) {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
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
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating user:", error);
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
        onSubmit={updateUser}
        className="flex flex-col items-center  bg-white p-4 rounded-lg w-full max-w-150"
      >
        <div className="w-full">
          <div className="w-full  md:grid md:gap-x-6 md:mb-6 md:grid-cols-2">
            {fields.map((field) => (
              <Input
                key={field.label}
                label={`${field.label} ${field.optional ? "(optional)" : ""}`}
                onChange={(v:string) =>
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
                  onChange={(v:string) => setPassword(v)}
                />
                <p className="text-sm text-gray-400 mb-2">
                  Leave blank to keep current password
                </p>
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(v:string) => setConfirmPassword(v)}
                />
              </div>
            )}
          </div>
          {isEditing && (
            <div className="mt-6">
              <button
                type="submit"
                className="bg-shade rounded-full w-full h-12 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!user) return;
                  setForm(mapUserToForm(user));
                  setPassword("");
                  setIsEditing(false);
                }}
                className="mt-2 bg-secondary rounded-full w-full h-12 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
          {!isEditing && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
                className="bg-accent rounded-full w-full h-12 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  logout()
                }}
                className="bg-shade rounded-full mt-2 w-full h-12 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </form>

      {loading && <p>Updating...</p>}
    </div>
  );
}
