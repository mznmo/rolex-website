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
  </Route>
);

const router = createBrowserRouter(routerDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
