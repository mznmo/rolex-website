import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import watches from "../../data.json";
import { useCart } from "../../store/CartContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cart, clearCart } = useCart();

  const quantity = cart.reduce((total, item) => total + item.quantity, 0);

  function handleLogout() {
    clearCart();
    localStorage.removeItem("token");
    localStorage.removeItem("orders");
    navigate("/");
  }

  function handleToggleSearch() {
    setShowMenu(false);
    setShowSearch(!showSearch);
  }

  function handleToggleMenu() {
    setShowSearch(false);
    setShowMenu(!showMenu);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredWatches = watches.filter((watch) =>
    watch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="w-full h-28 flex flex-row items-center justify-between px-4 sm:px-8 md:px-28 text-white top-0 z-50 sticky transition-all duration-300 bg-gradient-to-r from-[#0A3C1F] to-[#145C36]">
        <div className="flex items-center">
          <button
            className="transition-colors duration-300 hover:text-[#1e704d] text-lg mr-4"
            onClick={handleToggleMenu}
          >
            ☰ Menu
          </button>
        </div>

        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 z-10"
        >
          <img src={logo} className="h-16" alt="Rolex Logo" />
        </Link>

        <ul className="hidden md:flex flex-row gap-9 items-center">
          <li>
            <button
              className="transition-colors duration-300 hover:text-[#1e704d]"
              onClick={handleToggleSearch}
            >
              Search
            </button>
          </li>
          <li>
            {token && token !== "guest" ? (
              <div className="flex flex-row gap-6 items-center">
                <Link
                  to="/cart"
                  className="transition-colors duration-300 hover:text-[#1e704d]"
                >
                  Cart {quantity >= 1 ? `(${quantity})` : ""}
                </Link>
                |
                <button
                  className="font-thin transition-colors duration-300 hover:text-[#1e704d]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : token === "guest" ? (
              <div className="flex flex-row gap-6 items-center">
                <Link
                  to="/cart"
                  className="transition-colors duration-300 hover:text-[#1e704d]"
                >
                  Cart {quantity >= 1 ? `(${quantity})` : ""}
                </Link>
                <Link
                  to="/login"
                  className="transition-colors duration-300 hover:text-[#1e704d]"
                >
                  Login
                </Link>
                |<span className="font-thin">Guest</span>
              </div>
            ) : (
              !token && (
                <Link
                  to="/login"
                  className="transition-colors duration-300 hover:text-[#1e704d]"
                >
                  Login
                </Link>
              )
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

      {showMenu && (
        <div
          className="w-full bg-gradient-to-r from-[#0A3C1F] to-[#145C36] p-4 flex flex-col items-center"
          style={{
            backgroundImage: "linear-gradient(to right, #0A3C1F, #145C36)",
          }}
        >
          <div className="w-full px-5 flex flex-col">
            <div className="w-full text-white mb-11 space-x-6">
              <Link
                to="/"
                className="text-white transition-colors duration-300 hover:text-[#1e704d]"
              >
                Home
              </Link>
              <Link
                to="/orders"
                className="text-white transition-colors duration-300 hover:text-[#1e704d]"
              >
                View Orders
              </Link>
            </div>

            <div className="flex flex-col items-start">
              <div className="text-white mb-4 text-xl font-bold">
                Rolex Watches
              </div>
              <div className="flex overflow-x-auto pb-4 w-full gap-4 snap-x snap-mandatory scrollbar-hide">
                {watches.map((watch) => (
                  <motion.div
                    key={watch.id}
                    className="flex-none w-64 sm:w-72 snap-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={watch.image[0]}
                      alt={watch.name}
                      className="w-full h-auto rounded-lg object-cover aspect-square"
                      onClick={() => navigate(`/watch/${watch.id}`)}
                    />
                    <p className="text-center text-white mt-2 text-sm sm:text-base">
                      {watch.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
