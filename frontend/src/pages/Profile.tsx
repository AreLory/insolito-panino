import { useEffect, useState } from "react";
import { api } from "../config/axios";
import type IProfile from "../types/IProfile";
import { Link } from "react-router";

export default function Profile() {
  const [user, setUser] = useState<IProfile | null>(null);

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

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex flex-col items-center">
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
        <p>Password: **********</p>
        <p>Email: {user?.email}</p>
        {user?.phoneNumber ? <p>Telefono: {user?.phoneNumber}</p> : <p>Nessun numero inserito</p>}
        {user?.address.street ? (
          <p>
            Indirizzo: {user?.address.street} - N°{user?.address.number}
          </p>
        ) : <p>Nessun indirizzo inserito</p>} 
      </div>
      <Link to={'/profile/update'}>Update Profile</Link>
    </div>
  );
}
