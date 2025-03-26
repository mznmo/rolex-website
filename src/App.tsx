import "./App.css";
import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./components/Home/Home";
import Filterbar from "./components/Navbars/Filterbar";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Error from "./Error";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";
import ProtectedComponents from "./components/Authentication/ProtectedComp";
import CartProvider from "./store/CartContext";
import Checkout from "./components/Checkout/Checkout";

const routerDefinitions = createRoutesFromElements(
  <Route errorElement={<Error />}>
    <Route
      path="/"
      element={
        <>
          <HomePage /> <Filterbar />
        </>
      }
    ></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route
      path="/cart"
      element={<ProtectedComponents element={<Cart />} />}
    ></Route>
    <Route
      path="/checkout"
      element={<ProtectedComponents element={<Checkout />} />}
    ></Route>
    <Route path="/watch/:id" element={<ProductDetails />}></Route>
  </Route>
);

const router = createBrowserRouter(routerDefinitions);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
