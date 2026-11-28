import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Bikes from "./pages/Bikes.jsx";
import BikeDetails from "./pages/BikeDetails.jsx";
import Compare from "./pages/Compare.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Navbar from "./components/Navbar.jsx";
import CompareBar from "./components/CompareBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useCompare } from "./context/CompareContext.jsx";

export default function App() {
  const { selected } = useCompare();

  return (
    // Extra space at the bottom so the compare bar never covers the last cards
    <div className={selected.length > 0 ? "pb-24" : ""}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        {/* Later phases: /marketplace, /sell (protected) ... */}
      </Routes>
      <CompareBar />
    </div>
  );
}