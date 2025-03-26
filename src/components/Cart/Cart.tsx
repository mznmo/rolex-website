import Button from "../../UI/Button";
import { useCart } from "../../store/CartContext";
import Navbar from "../Navbars/Navbar";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <>
      <Navbar />
      {cart.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-screen font-thin text-5xl">
          Cart is empty.
          <Button text="Back" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl mb-6">Your cart</h1>
          <div className="flex flex-col w-1/2 h-auto p-16 space-y-4 border rounded-2xl">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex">
                  <span className="font-extrabold pr-6">{item.name}</span>
                  <span className="font-thin">
                    ${item.price.toLocaleString()} | {item.quantity}
                  </span>
                  <span className="font-thin"></span>
                </div>
                <Button text="Remove" onClick={() => removeFromCart(item.id)} />
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center w-1/2">
            <Button
              text={`Total: ${totalPrice.toLocaleString()} →`}
              to="/checkout"
            />
          </div>
        </div>
      )}
    </>
  );
}
