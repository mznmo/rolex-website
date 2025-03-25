import "./App.css";
import HomePage from "./components/Home/Home";
import Filterbar from "./components/Navbars/Filterbar";
import Navbar from "./components/Navbars/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Filterbar />
    </>
  );
}

export default App;
