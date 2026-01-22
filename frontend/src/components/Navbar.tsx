// todo: Links to Home, Menu, Order
import { Link, useLocation } from "react-router";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Ordina", path: "/order" },
  { label: "Chi siamo", path: "/about-us" },
  { label: "Profilo", path: "/profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const activeIndex = navItems.findIndex(item => item.path === location.pathname);
  const itemWidth = 90 / navItems.length;

  return (
    <div className="fixed bottom-0 bg-primary w-[90vw] h-20 text-white flex rounded-lg overflow-hidden">
      
      <span
        className="absolute top-0 h-full bg-secondary transition-all duration-500 ease-in-out"
        style={{
          width: `${itemWidth}vw`,
          left: `${activeIndex * itemWidth}vw`,
        }}
      />

      {navItems.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative z-10 flex-1 flex items-center justify-center transition-colors duration-300 ${
            location.pathname === item.path ? "text-primary font-semibold" : "text-white"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
