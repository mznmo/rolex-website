import { Link } from "react-router-dom";
import Navbar from "../Navbars/Navbar";
import homeVideo from "../../assets/home_video.mp4";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 p-4 text-center text-white">
          <p className="font-thin text-xl">THE COLLECTION</p>
          <p className="text-4xl font-extrabold">Rolex watches</p>
        </div>
        <video
          src={homeVideo}
          className="w-full h-8/12 object-cover"
          autoPlay
          loop
          muted
        />
        <div className="flex flex-col items-start gap-x-96 p-24 sm:flex-row">
          <p className="text-5xl font-bold" style={{ color: "#145C36" }}>
            Explore the Rolex <br /> collection
          </p>
          <div className="flex flex-col max-w-lg">
            <p className="text-xl font-thin">
              The Rolex collection offers a wide range of prestigious, high-{" "}
              <br />
              precision timepieces, from Professional to Classic models to suit
              any wrist.
            </p>
            <Link
              to="/productsList"
              className="mt-10 font-medium text-start text-sm transition-colors duration-300 hover:text-[#1e704d]"
            >
              Find your Rolex &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
