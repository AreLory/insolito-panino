import Loader from "../../components/shared/Loader";
import { Trash } from "lucide-react";
import type IProfile from "../../types/profile";

interface Props {
  users: IProfile[] | null;
  //   onEdit: (user: IProfile) => void;
  onDelete: (id: string) => void;
}

export default function UsersTable({ users, onDelete }: Props) {
  if (!users) return <Loader />;
  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-xl shadow p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{user.fullName}</h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {user.email || "-"}
                      </p>
                      <p className="font-medium ">
                        {user.phoneNumber}
                      </p>
                    </div>
                  </div>
      
                  <div className="flex justify-between items-center pt-2">
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => onDelete(user._id)}
                        className="p-2 bg-red-500 text-white rounded-lg"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      {/* Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-center">Indirizzo Email</th>
              <th className="p-3 text-center">N°Tel</th>
              <th className="p-3 text-center">Indirizzo</th>
              <th className="p-3 text-center">Azioni</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition text-center"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{`${user.fullName}`}</p>
                  </div>
                </td>

                <td className="p-3">{`${user.email}`}</td>

                <td className="p-3">{user.phoneNumber ? `${user.phoneNumber}` : `-`}</td>

                <td className="p-3">{user.address ? `${user.address}` : `-`}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onDelete(user._id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
