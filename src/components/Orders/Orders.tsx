import { useState, useEffect } from "react";
import Navbar from "../Navbars/Navbar";

type Order = {
  id: number;
  product: string[];
  address: string;
  phoneNumber: string;
  status: string;
};

export default function PreviousOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders: Order[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    setOrders(storedOrders);

    const timer = setTimeout(() => {
      const updatedOrders = storedOrders.map((order) =>
        order.status === "Pending" ? { ...order, status: "Delivered" } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl mb-6">Previous Orders</h1>
        <div className="w-1/2 p-8 shadow-lg bg-white rounded-lg">
          {orders.length === 0 ? (
            <p className="text-center">No previous orders.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border-b border-gray-300 py-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold">{order.product.join(", ")}</h2>
                  <p className="font-thin text-sm">
                    {new Date(order.id).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
