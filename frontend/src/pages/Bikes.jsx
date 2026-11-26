import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import BikeCard from "../components/BikeCard.jsx";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // What the user picked in the filters
  const [filters, setFilters] = useState({ search: "", brand: "", category: "", max_price: "" });

  // Load the dropdown options one time
  useEffect(() => {
    api.get("/brands").then((res) => setBrands(res.data)).catch(() => {});
    api.get("/bikes/categories").then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  // Load bikes every time a filter changes
  useEffect(() => {
    setLoading(true);
    setError("");
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") params[key] = value; // send only the filters that are filled
    });
    api
      .get("/bikes", { params })
      .then((res) => setBikes(res.data))
      .catch(() => setError("Could not load bikes. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [filters]);

  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Explore Bikes</h1>
          <Link to="/" className="text-blue-600 hover:underline">← Home</Link>
        </div>

        {/* Filters */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            name="search"
            value={filters.search}
            onChange={change}
            placeholder="Search bike name..."
            className="p-2 rounded border bg-white"
          />
          <select name="brand" value={filters.brand} onChange={change} className="p-2 rounded border bg-white">
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
          <select name="category" value={filters.category} onChange={change} className="p-2 rounded border bg-white">
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select name="max_price" value={filters.max_price} onChange={change} className="p-2 rounded border bg-white">
            <option value="">Any price</option>
            <option value="100000">Under ₹1,00,000</option>
            <option value="150000">Under ₹1,50,000</option>
            <option value="200000">Under ₹2,00,000</option>
            <option value="300000">Under ₹3,00,000</option>
          </select>
        </div>

        {/* Results */}
        {loading && <p className="mt-8 text-gray-600">Loading bikes...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}
        {!loading && !error && bikes.length === 0 && (
          <p className="mt-8 text-gray-600">No bikes match your filters.</p>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </main>
  );
}