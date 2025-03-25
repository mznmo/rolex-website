import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logo} className="h-36" />
      <p className="text-5xl font-bold mb-3">Error Ocurred.</p>
      <p className="text-3xl font-thin mb-6">Page could not be found.</p>
      <Link
        to="/"
        className="text-white p-2 px-6 rounded transition-colors duration-300 hover:text-[#1e704d]"
        style={{
          background: "linear-gradient(to right, #0A3C1F, #145C36)",
        }}
      >
        Back
      </Link>
    </div>
  );
}
