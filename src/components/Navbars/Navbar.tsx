import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav
      className="w-full h-28 flex flex-row items-center px-4 sm:px-28 text-white top-0 z-50 sticky bg-gradient-to-r from-[#0A3C1F] to-[#145C36]"
      style={{
        backgroundImage: "linear-gradient(to right, #0A3C1F, #145C36)",
      }}
    >
      <button className="transition-colors duration-300 hover:text-[#1e704d]">
        ☰ Menu
      </button>
      <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
        <img src={logo} className="h-16" />
      </Link>
      <ul className="flex flex-row gap-9 ml-auto hidden sm:flex">
        <li>
          <Link
            to="/"
            className="transition-colors duration-300 hover:text-[#1e704d]"
          >
            Search
          </Link>
        </li>
        <li>
          {token ? (
            <div className="flex flex-row gap-6 items-center">
              <Link
                to="/signup"
                className="transition-colors duration-300 hover:text-[#1e704d]"
              >
                Cart
              </Link>
              |
              <button
                className="font-thin transition-colors duration-300 hover:text-[#1e704d]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/signup"
              className="transition-colors duration-300 hover:text-[#1e704d]"
            >
              Sign up
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
