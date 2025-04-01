import { useParams } from "react-router-dom";
import watches from "../../data.json";
import Navbar from "../Navbars/Navbar";
import Button from "../../UI/Button";
import { useCart } from "../../store/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const filteredWatch = watches.find((watch) => watch.id === Number(id));
  const { addToCart } = useCart();
  const token = localStorage.getItem("token");
  const [quantity, setQuantity] = useState<number>(1);

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decrementQuantity() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  return (
    <>
      <Navbar />
      {filteredWatch && (
        <div className="flex flex-row h-screen p-5 items-center justify-center">
          <img
            src={filteredWatch.image[1]}
            alt={filteredWatch.name}
            className="h-5/6 rounded"
          />
          <div className="flex flex-col ml-10 text-[#145C36]">
            <p className="font-extrabold text-sm">ROLEX</p>
            <h1 className="font-bold text-4xl mb-5">{filteredWatch.name}</h1>
            <p className="font-thin">{filteredWatch.description[1]}</p>
            <h2 className="font-thin">
              Price: ${filteredWatch.price.toLocaleString()}
            </h2>
            <div className="flex flex-row gap-8">
              <Button
                text="-"
                to={`/watch/${id}`}
                onClick={decrementQuantity}
              />
              <p className="mt-8">Quantity: {quantity}</p>
              <Button text="+" to={`/watch/${id}`} onClick={increaseQuantity} />
            </div>
            <motion.div className="flex" whileTap={{ scale: 1.01 }}>
              <Button
                text="Add to cart"
                {...(token
                  ? {
                      onClick: () => addToCart(filteredWatch.id, quantity),
                      to: `/watch/${id}`,
                    }
                  : { to: "/login" })}
              />
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
