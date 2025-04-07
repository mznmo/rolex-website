import { Link } from "react-router-dom";
import watches from "../../data.json";
import Navbar from "../Navbars/Navbar";
import { motion } from "framer-motion";

export default function ProductsList() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p className="font-semibold text-xl sm:text-2xl md:text-3xl">
            ROLEX WATCHES
          </p>
          <p className="font-extrabold text-4xl sm:text-5xl md:text-6xl">
            All Models
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl">
          {watches.map((product) => (
            <Link
              to={`/watch/${product.id}`}
              key={product.id}
              className="h-full"
            >
              <motion.div
                className="flex flex-col sm:flex-row bg-gray-50 shadow-lg rounded-lg p-4 sm:p-6 h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col justify-center flex-1 mb-4 sm:mb-0 sm:mr-4">
                  <h2 className="font-bold text-base sm:text-lg md:text-xl">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-thin text-gray-600 mt-1 sm:mt-2">
                    {product.description[1]}
                  </p>
                </div>
                <motion.div
                  className="w-full sm:w-1/2 flex justify-center sm:justify-end overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={product.image[1]}
                    alt={product.name}
                    className="w-full h-48 sm:h-auto object-cover transition-all duration-300 rounded-lg"
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
