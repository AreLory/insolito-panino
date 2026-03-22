import { useEffect, useState } from "react";

import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

import Loader from "../../components/shared/Loader";
import UsersTable from "../components/UsersTable";
import MiniNavBar from "../../components/shared/MiniNavBar";

import type IProfile from "../../types/profile";

import { ChevronLeft } from "lucide-react";


export default function AdminUsers() {
  const [usersList, setUsersList] = useState<IProfile[] | null>(null);

  const getUsers = async () => {
    try {
      const res = await api.get(`${API_BASE_URL}/users`);
      setUsersList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async(id:string)=>{
    try {
        await api.delete(`${API_BASE_URL}/user/${id}`)
    } catch (error) {
        console.log(error)
    }
  }

  if (!usersList) return <Loader />;

  return (
    <div className="flex flex-col pt-18 justify-center items-center overflow-x-hidden">
        <MiniNavBar
        leftChild={<ChevronLeft />}
        goBack="/admin"
        pageName="Users List"
      />
        <UsersTable users={usersList} onDelete={handleDelete}/>
    </div>
  );
}
