import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbars/Navbar";
import { useCart } from "../../store/CartContext";
import Input from "../../UI/Input";

export default function Checkout() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { clearCart, cart } = useCart();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const firstName = firstNameRef.current?.value.trim() || "";
    const lastName = lastNameRef.current?.value.trim() || "";
    const address = addressRef.current?.value.trim() || "";
    const phoneNumber = phoneNumberRef.current?.value.trim() || "";

    if (!firstName || !lastName || !address || !phoneNumber) {
      return setError(true);
    }
    clearCart();
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      product: cart.map((item) => item.name),
      address,
      phoneNumber,
      status: "Pending",
    };
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );
    navigate("/checkout-completed");
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl mb-6">Checkout</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-8 w-96 shadow-lg space-y-4 bg-white rounded-lg"
        >
          <div className="flex flex-col w-full text-[#145C36] font-semibold">
            <label>First Name:</label>
            <Input ref={firstNameRef} />

            <label>Last Name:</label>
            <Input ref={lastNameRef} />

            <label>Address:</label>
            <Input ref={addressRef} />

            <label>Phone Number:</label>
            <Input type="number" ref={phoneNumberRef} />
          </div>
          <button
            className="mt-7 rounded p-2 px-5 transition-colors duration-300 hover:text-[#1e704d] text-sm text-white"
            style={{
              background: "linear-gradient(to right, #0A3C1F, #145C36)",
            }}
            type="submit"
          >
            Checkout
          </button>
          {error && (
            <p className="text-red-500 text-xs">All fields are required.</p>
          )}
        </form>
      </div>
    </>
  );
}
