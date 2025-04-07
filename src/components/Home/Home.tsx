import { Link } from "react-router-dom";
import Navbar from "../Navbars/Navbar";
import homeVideo from "../../assets/home_video.mp4";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 p-4 text-center text-white z-10">
          <p className="font-thin text-lg sm:text-3xl">THE COLLECTION</p>
          <p className="text-2xl sm:text-5xl md:text-6xl font-extrabold">
            Rolex watches
          </p>
        </div>
        <video
          src={homeVideo}
          className="w-full h-screen object-cover"
          autoPlay
          loop
          muted
        />
        <div className="relative flex flex-col items-center px-4 py-12 sm:px-8 md:px-12 lg:px-24 gap-8 sm:gap-12 md:gap-16 lg:flex-row lg:justify-between">
          <p
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left"
            style={{ color: "#145C36" }}
          >
            Explore the Rolex <br className="hidden sm:block" /> collection
          </p>
          <div className="flex flex-col max-w-lg text-center lg:text-left">
            <p className="text-lg sm:text-xl font-thin">
              The Rolex collection offers a wide range of prestigious, high-
              precision timepieces, from Professional to Classic models to suit
              any wrist.
            </p>
            <Link
              to="/productsList"
              className="mt-6 sm:mt-10 font-medium text-sm transition-colors duration-300 hover:text-[#1e704d] inline-block"
            >
              Find your Rolex &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
