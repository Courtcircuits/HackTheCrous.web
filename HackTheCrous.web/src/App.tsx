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
        <Menu />
        <div className="grid grid-cols-10 gap-4 col-span-12 sm:col-span-10 md:col-span-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
