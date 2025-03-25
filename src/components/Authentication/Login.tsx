import Navbar from "../Navbars/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    } else if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log("OK OK OK OK");
      navigate("/");
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
          <h2 className="text-2xl font-bold mb-6">Login</h2>

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
            Login
          </button>
          <p className="mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#1e704d]">
              Sign up
            </Link>
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </>
  );
}
