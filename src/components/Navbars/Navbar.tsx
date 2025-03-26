import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import watches from "../../data.json";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleToggleSearch() {
    setShowSearch(!showSearch);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredWatches = watches.filter((watch) =>
    watch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="w-full h-28 flex flex-row items-center px-4 sm:px-28 text-white top-0 z-50 sticky transition-all duration-300 bg-gradient-to-r from-[#0A3C1F] to-[#145C36]">
        <button className="transition-colors duration-300 hover:text-[#1e704d]">
          ☰ Menu
        </button>
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} className="h-16" />
        </Link>
        <ul className="flex flex-row gap-9 ml-auto hidden sm:flex">
          <li>
            <button
              className="transition-colors duration-300 hover:text-[#1e704d]"
              onClick={handleToggleSearch}
            >
              Search
            </button>
          </li>
          <li>
            {token ? (
              <div className="flex flex-row gap-6 items-center">
                <Link
                  to="/cart"
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

      {showSearch && (
        <div
          className="w-full bg-gradient-to-r from-[#0A3C1F] to-[#145C36] p-4 flex flex-col items-center"
          style={{
            backgroundImage: "linear-gradient(to right, #0A3C1F, #145C36)",
          }}
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="w-1/2 p-2 border border-gray-300 rounded-4xl text-white"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="w-1/2 border-b last:border-b-0 flex flex-col items-start mt-6">
            {filteredWatches.map((watch) => (
              <Link
                to={`/watch/${watch.id}`}
                key={watch.id}
                className=" text-white w-full transition-colors duration-300 hover:text-[#1e704d] p-3 flex justify-between"
              >
                {watch.name}
                <span>&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
