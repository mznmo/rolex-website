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
        <div className="flex flex-col items-center justify-center h-screen font-thin text-5xl bg-gray-100">
          Cart is empty.
          <Button text="Back" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-3xl mb-6">Your cart</h1>
          <div className="flex flex-col w-1/2 h-auto p-16 space-y-4 rounded-lg bg-white shadow-lg">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="border-b border-gray-300 w-full mt-11">
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <span className="font-extrabold pr-3">{item.name}</span>
                      <span className="font-thin text-sm">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                    <span className="font-thin">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
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
