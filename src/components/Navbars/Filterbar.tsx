import { useState } from "react";
import Products from "../Products/Products";

export default function Filterbar() {
  const [filter, setFilter] = useState<string>("All"); // initialize the filter state as a string

  function handleFilter(event: React.MouseEvent<HTMLButtonElement>) {
    //identify that the mouseevent is coming from a button
    setFilter(event.currentTarget.id); // use `event.currentTarget.id` to get the clicked element's id
  }

  return (
    <>
      <nav className="flex items-center justify-center h-full">
        <ul className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-9 mt-12 sm:mt-16 md:mt-24 font-semibold text-sm sm:text-base">
          <li>
            <button
              id="All"
              onClick={handleFilter}
              className={`relative ${filter === "All" ? "text-[#1e704d]" : ""}`}
            >
              All
              {filter === "All" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e704d]"></span>
              )}
            </button>
          </li>
          <li>
            <button
              id="Classic"
              onClick={handleFilter}
              className={`relative ${
                filter === "Classic" ? "text-[#1e704d]" : ""
              }`}
            >
              Classic
              {filter === "Classic" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e704d]"></span>
              )}
            </button>
          </li>
          <li>
            <button
              id="Professional"
              onClick={handleFilter}
              className={`relative ${
                filter === "Professional" ? "text-[#1e704d]" : ""
              }`}
            >
              Professional
              {filter === "Professional" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e704d]"></span>
              )}
            </button>
          </li>
        </ul>
      </nav>
      <Products filterType={filter} />
    </>
  );
}
