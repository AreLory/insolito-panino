import { Link } from "react-router";

import { ShoppingCart, Menu, User } from "lucide-react";

interface Props {
  cartItemCount: number;
}

export default function Header({ cartItemCount }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-black to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
            to={"/cart"}
            className="p-2 hover:bg-white/10 rounded-lg transition relative"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🚚</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-tight">
              The unusual burger
            </h1>
            <p className="text-xs opacity-90">More than a burger</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          
          <Link
            to={"/profile"}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <User size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}
