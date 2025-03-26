import { Link } from "react-router-dom";
import watches from "../../data.json";
import Button from "../../UI/Button";
import { useCart } from "../../store/CartContext";

type ProductsProps = {
  filterType: string; // declaring the type of filterType as string
};

export default function Products({ filterType }: ProductsProps) {
  console.log(filterType);
  const { addToCart } = useCart(); // using the custom hook to get the addToCart function from CartContext

  const filteredWatches = filterType
    ? filterType === "All"
      ? watches //if filtertype is all then show all watches
      : watches.filter((watch) => watch.category === filterType) //if filtertype is not all then show the category
    : watches; //if not selected category then show all

  return (
    <div className="grid mt-6">
      {filteredWatches.map((watch) => (
        <ul key={watch.id} className="relative">
          <li>
            <Link to={`/watch/${watch.id}`}>
              <img src={watch.image[0]} alt={watch.name} />
              <div className="absolute bottom-28 left-24 p-4 text-white">
                <h2 className="font-bold mb-5 text-4xl">{watch.name}</h2>
                <p className="font-thin text-xl">{watch.description}</p>
                <p className="font-thin">${watch.price.toLocaleString()}</p>
              </div>
            </Link>
            <div className="absolute bottom-14 left-24 p-4">
              <Button text="Buy now" onClick={() => addToCart(watch.id)} />
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}
