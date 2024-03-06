import CalendarIcon from "../assets/icons/Calendar";
import HomeIcon from "../assets/icons/Home";
import ShopIcon from "../assets/icons/Shop";
import { Link, useLocation } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="flex flex-col col-span-3 rounded-lg px-5 bg-tint200 py-4 h-fit">
      <ul>
        <MenuSection icon={<HomeIcon />} text="Home" to="/" />
        <MenuSection icon={<ShopIcon />} text="Restaurant" to="/restaurant" />
        <MenuSection icon={<CalendarIcon />} text="Calendar" to="/calendar" />
      </ul>
    </nav>
  );
}

function MenuSection({
  icon,
  text,
  to,
}: {
  icon: JSX.Element;
  text: string;
  to: string;
}) {
  const location = useLocation();
  const active = "/" + location.pathname.split("/")[1] === to;
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
