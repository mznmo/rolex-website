import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav
      className="w-full h-28 flex items-center px-4 sm:px-28 text-white"
      style={{
        backgroundImage: "linear-gradient(to right, #0A3C1F, #145C36)",
      }}
    >
      <button className="transition-colors duration-300 hover:text-[#1e704d]">
        ☰ Menu
      </button>
      <div className="flex-grow flex justify-center">
        <img src={logo} className="h-16 ml-44" />
      </div>
      <ul className="flex flex-row gap-9 ml-auto hidden sm:flex">
        <li>
          <a
            href="/"
            className="transition-colors duration-300 hover:text-[#1e704d]"
          >
            Search
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="transition-colors duration-300 hover:text-[#1e704d]"
          >
            Stores
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="transition-colors duration-300 hover:text-[#1e704d]"
          >
            Favourites
          </a>
        </li>
      </ul>
    </nav>
  );
}
