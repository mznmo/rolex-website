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
        <div className="flex flex-col md:flex-row min-h-screen p-4 sm:p-6 md:p-8 items-center justify-center">
          {/* <div className="w-full flex justify-center mb-6 md:mb-0"> */}
          <img
            src={filteredWatch.image[1]}
            alt={filteredWatch.name}
            className="h-64 sm:h-80 md:h-96 lg:h-[32rem] w-auto object-contain rounded-lg"
          />
          {/* </div> */}
          <div className="flex flex-col md:w-1/5 text-[#145C36] px-4 sm:px-6">
            <p className="font-extrabold text-xs sm:text-sm">ROLEX</p>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-5">
              {filteredWatch.name}
            </h1>
            <p className="font-thin text-sm sm:text-base mb-4 sm:mb-6">
              {filteredWatch.description[1]}
            </p>
            <h2 className="font-thin text-lg sm:text-xl mb-4 sm:mb-6">
              Price: ${filteredWatch.price.toLocaleString()}
            </h2>
            <div className="flex flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <Button
                text="-"
                to={`/watch/${id}`}
                onClick={decrementQuantity}
              />
              <p className="text-sm sm:text-base mt-7">Quantity: {quantity}</p>
              <Button text="+" to={`/watch/${id}`} onClick={increaseQuantity} />
            </div>
            <motion.div className="flex" whileTap={{ scale: 1.01 }}>
              <Button
                text="Add to cart"
                onClick={() => addToCart(filteredWatch.id, quantity)}
              />
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
