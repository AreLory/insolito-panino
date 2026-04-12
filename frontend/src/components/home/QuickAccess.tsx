import { User, History } from "lucide-react";
import { Link } from "react-router";

interface Props {
  isAdmin: boolean;
}

interface QuickAccessItem {
  id: string;
  icon: "user" | "history";
  label: string;
  link: string;
  color: string;
}

const iconMap = {
  user: User,
  history: History,
};

const quickAccessItems: QuickAccessItem[] = [
  {
    id: "1",
    icon: "user" as const,
    label: "Profile",
    link: "/profile",
    color: "bg-gradient-to-br from-orange-400 to-red-400",
  },
  {
    id: "2",
    icon: "history" as const,
    label: "Orders History",
    link: "/orders-history",
    color: "bg-gradient-to-br from-blue-400 to-cyan-400",
  },
];

export default function QuickAccess({ isAdmin }: Props) {
  return (
    <div className="mx-4 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Access</h2>

      <div className="grid grid-cols-2 gap-3">
        {quickAccessItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Link
              to={item.link}
              key={item.id}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group"
            >
              <div
                className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition`}
              >
                <Icon size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">{item.label}</p>
              </div>
            </Link>
          );
        })}

        {isAdmin && (
          <Link
            to={"/admin"}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group"
          >
            <div
              className={`w-12 h-12 bg-linear-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition`}
            >
              <User size={24} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">Admin</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
