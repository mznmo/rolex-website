import { Link } from "react-router-dom";
import watches from "../../data.json";
import Navbar from "../Navbars/Navbar";
import { motion } from "framer-motion";

export default function ProductsList() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-10">
          <p className="font-semibold text-2xl">ROLEX WATCHES</p>
          <p className="font-extrabold text-6xl">All Models</p>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-8 w-6/7">
          {watches.map((product) => (
            <Link to={`/watch/${product.id}`} key={product.id}>
              <motion.div
                className="flex bg-gray-50 shadow-lg rounded-lg p-6 h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col justify-center flex-1">
                  <h2 className="font-bold text-lg">{product.name}</h2>
                  <p className="text-sm font-thin text-gray-600">
                    {product.description[1]}
                  </p>
                </div>
                <motion.div
                  className="w-1/2 flex justify-end overflow-hidden"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={product.image[1]}
                    alt={product.name}
                    className="object-cover transition-all duration-300"
                  />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
