import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Bikes from "./pages/Bikes.jsx";
import BikeDetails from "./pages/BikeDetails.jsx";
import Compare from "./pages/Compare.jsx";
import CompareBar from "./components/CompareBar.jsx";
import { useCompare } from "./context/CompareContext.jsx";

export default function App() {
  const { selected } = useCompare();

  return (
    // Extra space at the bottom so the compare bar never covers the last cards
    <div className={selected.length > 0 ? "pb-24" : ""}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />
        <Route path="/compare" element={<Compare />} />
        {/* Later phases: /login, /marketplace ... */}
      </Routes>
      <CompareBar />
    </div>
  );
}