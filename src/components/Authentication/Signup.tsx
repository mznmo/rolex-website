import Navbar from "../Navbars/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError("Email already in use.");
    } else if (response.ok) {
      console.log("OK OK OK OK");
      navigate("/login");
    } else {
      console.log(data.message);
      setError(data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-80"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

          <label className="w-full text-left mb-1">Username</label>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label className="w-full text-left mb-1">Email</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label className="w-full text-left mb-1">Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-6 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full p-2 rounded text-white transition-colors duration-300 hover:text-[#1e704d]"
            style={{
              background: "linear-gradient(to right, #0A3C1F, #145C36)",
            }}
          >
            Sign Up
          </button>
          <p className="mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1e704d]">
              Login
            </Link>
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </>
  );
}
