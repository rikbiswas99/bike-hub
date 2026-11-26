import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Bikes from "./pages/Bikes.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bikes" element={<Bikes />} />
      {/* Later phases: /bikes/:id, /compare, /marketplace, /login ... */}
    </Routes>
  );
}