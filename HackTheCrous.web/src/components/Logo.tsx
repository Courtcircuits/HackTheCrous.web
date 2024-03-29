import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="hidden sm:flex flex-row bg-gradient-to-r from-limeGreen to-primary px-0 lg:px-5 h-20 rounded-lg items-center col-span-2 justify-center"
    >
      <div className="rounded-full bg-tint0 w-12 h-12 mr-0 md:mr-4"></div>
      <div className="flex-col hidden md:flex">
        <h1 className="text-2xl text-stroke-3 text-tint0 font-grotesk mb-[-15px]">
          HACK THE
        </h1>
        <h2 className="text-4xl text-stroke-3 text-tint0 font-grotesk">
          CR*US
        </h2>
      </div>
    </Link>
  );
}
