import { Link } from "react-router-dom";
import watches from "../../data.json";
import Button from "../../UI/Button";
import { useCart } from "../../store/CartContext";
import { motion } from "framer-motion";

type ProductsProps = {
  filterType: string;
};

export default function Products({ filterType }: ProductsProps) {
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();

  const filteredWatches = filterType
    ? filterType === "All"
      ? watches
      : watches.filter((watch) => watch.category === filterType)
    : watches;

  return (
    <motion.div className="grid mt-6" viewport={{ once: true }}>
      {filteredWatches.map((watch) => (
        <motion.ul
          key={watch.id}
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <li>
            <Link to={`/watch/${watch.id}`}>
              <img
                src={watch.image[0]}
                alt={watch.name}
                className="w-full object-cover"
              />
              <motion.div
                className="absolute bottom-2/12 left-1/12 p-2 sm:p-4 text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="font-bold mb-2 sm:mb-5 text-base sm:text-2xl lg:text-4xl">
                  {watch.name}
                </h2>
                <p className="hidden sm:block font-thin text-sm lg:text-xl ">
                  {watch.description[0]}
                </p>
                <p className="font-thin text-xs sm:text-base">
                  ${watch.price.toLocaleString()}
                </p>
              </motion.div>
            </Link>
            <motion.div
              className="absolute bottom-0.5 sm:bottom-1/12 left-1/12 p-2 sm:p-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button
                text="Buy now"
                {...(token
                  ? { onClick: () => addToCart(watch.id, 1) }
                  : { to: "/login" })}
              />
            </motion.div>
          </li>
        </motion.ul>
      ))}
    </motion.div>
  );
}
