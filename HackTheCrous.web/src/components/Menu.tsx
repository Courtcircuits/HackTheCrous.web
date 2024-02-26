import CalendarIcon from "../assets/icons/Calendar";
import HomeIcon from "../assets/icons/Home";
import ShopIcon from "../assets/icons/Shop";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="flex flex-col col-span-3 rounded-lg px-5 bg-tint200 py-4 h-fit">
      <ul>
        <MenuSection icon={<HomeIcon />} text="Home" to="/" active />
        <MenuSection icon={<ShopIcon />} text="Shop" to="/shop" />
        <MenuSection icon={<CalendarIcon />} text="Calendar" to="/calendar" />
      </ul>
    </nav>
  );
}

function MenuSection({
  icon,
  text,
  to,
  active,
}: {
  icon: JSX.Element;
  text: string;
  to: string;
  active?: boolean;
}) {
  return (
    <li>
      <Link
        to={to}
        className={`flex flex-row hover:bg-tint0 transition-all duration-150 ease-linear items-center rounded-lg my-1 ${
          active && "bg-tint0 "
        }`}
      >
        <div className="p-3">{icon}</div>
        <p className="font-clean">{text}</p>
      </Link>
    </li>
  );
}
