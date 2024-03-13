import { Outlet } from "react-router-dom";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import SearchBar from "./components/Searchbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 sm:mx-[10%] my-4 mx-[2%]">
        <Logo />
        <SearchBar />
        <div className="hidden col-span-2 sm:flex rounded-lg px-5 justify-center items-center bg-tint200  h-20">
          <p className="text-2xl text-center font-semibold ">
            idk what to put here
          </p>
        </div>
        <Menu />
        <div className="grid grid-cols-8 gap-4 col-span-12 sm:col-span-8 md:col-span-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
