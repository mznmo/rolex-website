import watches from "../../data.json";

type ProductsProps = {
  filterType: string; // declaring the type of filterType as string
};

export default function Products({ filterType }: ProductsProps) {
  console.log(filterType);

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
            <img src={watch.image} alt={watch.name} />
            <div className="absolute bottom-28 left-24 p-4 text-white">
              <h2 className="font-bold mb-5 text-4xl">{watch.name}</h2>
              <p className="font-thin text-xl">{watch.description}</p>
              <p className="font-thin">{watch.price}</p>
              <button
                className="mt-7 rounded p-2 px-5 transition-colors duration-300 hover:text-[#1e704d] text-sm"
                style={{
                  background: "linear-gradient(to right, #0A3C1F, #145C36)",
                }}
              >
                Buy now
              </button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}
