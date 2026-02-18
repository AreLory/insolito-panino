import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../../features/cart/cartSelectors";
//assets/img
import homeGray from "../../assets/img/home-gray.svg";
import homeYellow from "../../assets/img/home-yellow.svg";
import cartGray from "../../assets/img/cart-gray.png";
import cartYellow from "../../assets/img/cart-yellow.png";
import menuGray from "../../assets/img/menu-gray.png";
import menuYellow from "../../assets/img/menu-yellow.png";
import accountGray from "../../assets/img/account-gray.png";
import accountYellow from "../../assets/img/account-yellow.png";

const navItems = [
  { label: "Home", path: "/", icon: homeGray, altIcon: homeYellow },
  { label: "Menu", path: "/menu", icon: menuGray, altIcon: menuYellow },
  { label: "Carrello", path: "/cart", icon: cartGray, altIcon: cartYellow },
  {
    label: "Profilo",
    path: "/profile",
    icon: accountGray,
    altIcon: accountYellow,
  },
];

export default function BottomNav() {
  const location = useLocation();
  const itemsQuantity = useSelector(selectTotalItems);
  const activeIndex = navItems.findIndex(
    (item) => item.path === location.pathname,
  );
  const itemWidth = 100 / navItems.length;

  return (
    <div className="fixed bg-white bottom-0 w-screen h-20 text-primary flex overflow-hidden">
      <span
        className="absolute top-0 h-full bg-secondary transition-all duration-500 ease-in-out"
        style={{
          width: `${itemWidth}vw`,
          left: `${activeIndex * itemWidth}vw`,
        }}
      />

      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative z-10 flex-1 flex items-center justify-center transition-colors duration-300 ${
            location.pathname === item.path
              ? "text-primary font-semibold border-t"
              : "text-primary "
          }`}
        >
          <div className="relative">
            <img
              className="size-12"
              src={location.pathname === item.path ? item.icon : item.altIcon}
              alt={item.label}
            />

            {itemsQuantity > 0 && item.path === "/cart" && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {itemsQuantity}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
