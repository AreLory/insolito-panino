import { useEffect, useState } from "react";
import { api } from "../config/axios";
import type IProfile from "../types/IProfile";
import Input from "../components/Input";

export default function Profile() {
  const [user, setUser] = useState<IProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [form, setForm] = useState<IProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      number: "",
    },
  });

  const mapUserToForm = (user: IProfile) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phoneNumber: user.phoneNumber || "",
  address: {
    street: user.address.street || "",
    number: user.address.number || "",
  },
});
  
  const getInfo = async () => {
    try {
      const profileInfo = await api.get("/users/me");
      const { firstName, lastName, email, phoneNumber, address }: IProfile =
        profileInfo.data;

      setUser({ firstName, lastName, email, phoneNumber, address });
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
      label: "First Name",
      name: "firstName",
      value: form.firstName,
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      value: form.lastName,
      required: true,
    },
    { label: "Email", name: "email", value: form.email, type: 'email', required: true },
    {
      label: "Password",
      name: "password",
      value: password,
      type: "password",
    },
    {
      label: "Phone Number (optional)",
      name: "phoneNumber",
      value: form.phoneNumber,
    },
    {
      label: "Street Name (optional)",
      name: "street",
      value: form.address.street,
    },
    {
      label: "House Number (optional)",
      name: "number",
      value: form.address.number,
    },
  ];

  const handleChange = (field: string, value: string) => {
    if (field === "street" || field === "number") {
      setForm((prevForm) => ({
        ...prevForm,
        address: {
          ...prevForm.address,
          [field]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [field]: value,
      }));
    }
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { firstName, lastName, email, phoneNumber, address } = form;
      const { street, number: numberAddress } = address;

      const payload: any = {
        firstName,
        lastName,
        email,
        phoneNumber,
        address: { street, number: numberAddress },
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
    <div className="justify-center items-center flex flex-col h-[90vh]">
      <form
        onSubmit={updateUser}
        className="flex flex-col items-center  bg-white p-4 rounded-lg w-[60vw] max-w-150 "
      >
        <h1 className="text-lg text-shade font-bold">
          {isEditing ? "Update User" : "Your Profile"}
        </h1>
        <div className="grid gap-x-6 mb-6 md:grid-cols-2">
          {fields.map((field) => (
            <Input
              key={field.label}
              label={field.label}
              onChange={(v) => handleChange(field.name, v)}
              value={field.value}
              required={field.required}
              type={field.type || "text"}
              readonly={!isEditing}
            />
          ))}
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-shade rounded-lg w-22 h-10 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
          >
            Edit
          </button>
        )}

        {isEditing && (
          <button
            type="submit"
            className="bg-shade rounded-lg w-22 h-10 text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
          >
            Save
          </button>
        )}
          
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              if (!user) return;
              setForm(mapUserToForm(user));
              setPassword("");
              setIsEditing(false);
            }}
            className="bg-secondary mt-1 rounded-lg w-22 h-10 text-primary hover:text-white shadow-xs shadow-primary hover:bg-accent hover:cursor-pointer"
          >
            Cancel
          </button>
        )}

        {loading && <p>Updating...</p>}
      </form>
    </div>
  );
}
