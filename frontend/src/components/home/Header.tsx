import { ShoppingCart, Menu, User } from 'lucide-react';
import { Link } from 'react-router';

interface HeaderProps {
  cartItemCount: number;
  onMenuClick: () => void;
}

export default function Header({ cartItemCount, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={onMenuClick} className="p-2 hover:bg-white/10 rounded-lg transition">
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🚚</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-tight">StreetBite</h1>
            <p className="text-xs opacity-90">Food on Wheels</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to={'/cart'} className="p-2 hover:bg-white/10 rounded-lg transition relative">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to={'/profile'} className="p-2 hover:bg-white/10 rounded-lg transition">
            <User size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}
