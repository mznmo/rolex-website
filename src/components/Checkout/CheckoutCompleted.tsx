import { Link } from "react-router-dom";
import Navbar from "../Navbars/Navbar";
import Button from "../../UI/Button";

export default function CheckoutCompleted() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-5xl mb-3">Thank you for your purchase!</p>
        <p className="font-light">
          Your order will be delivered in 1 to 2 weeks.{" "}
          <Link to="/orders" className="text-[#145C36] font-thin">
            View your order &rarr;
          </Link>
        </p>
        <Button text="Back" to="/" />
      </div>
    </>
  );
}
