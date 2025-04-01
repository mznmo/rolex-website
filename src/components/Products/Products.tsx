import { Link } from "react-router-dom";
import watches from "../../data.json";
import Button from "../../UI/Button";
import { useCart } from "../../store/CartContext";
import { motion } from "framer-motion";

type ProductsProps = {
  filterType: string; // declaring the type of filterType as string
};

export default function Products({ filterType }: ProductsProps) {
  const token = localStorage.getItem("token");
  console.log(filterType);
  const { addToCart } = useCart(); // using the custom hook to get the addToCart function from CartContext

  const filteredWatches = filterType
    ? filterType === "All"
      ? watches //if filtertype is all then show all watches
      : watches.filter((watch) => watch.category === filterType) //if filtertype is not all then show the category
    : watches; //if not selected category then show all

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
              <img src={watch.image[0]} alt={watch.name} />
              <motion.div
                className="absolute bottom-28 left-24 p-4 text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="font-bold mb-5 text-4xl">{watch.name}</h2>
                <p className="font-thin text-xl">{watch.description[0]}</p>
                <p className="font-thin">${watch.price.toLocaleString()}</p>
              </motion.div>
            </Link>
            <motion.div
              className="absolute bottom-14 left-24 p-4"
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
