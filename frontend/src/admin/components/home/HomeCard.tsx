import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

interface Props {
    to: string,
    title:string,
    description:string
}

export const HomeCard = ({ to, title, description }:Props) => (
  <Link
    to={to}
    className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition group relative overflow-hidden"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition bg-black" />

    <div className="flex flex-col h-full">
      <h3 className="font-bold text-gray-800 text-lg mb-1">
        {title}
      </h3>

      <p className="text-gray-500 text-sm flex-grow">
        {description}
      </p>

      <div className="flex justify-end mt-4">
        <ChevronRight
          size={18}
          className="text-gray-400 group-hover:text-orange-500 transition"
        />
      </div>
    </div>
  </Link>
);