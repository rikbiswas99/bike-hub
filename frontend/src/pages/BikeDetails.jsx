import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios.js";
import { useCompare, MAX_COMPARE } from "../context/CompareContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function BikeDetails() {
  const { id } = useParams(); // the number in the address: /bikes/3 -> "3"
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { selected, isSelected, toggle } = useCompare();

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/bikes/${id}`)
      .then((res) => setBike(res.data))
      .catch((err) =>
        setError(err.response?.status === 404 ? "This bike was not found." : "Could not load the bike. Is the backend running?")
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="p-6">Loading...</main>;

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <p className="text-red-600">{error}</p>
        <Link to="/bikes" className="text-blue-600 hover:underline">← Back to bikes</Link>
      </main>
    );
  }

  const specs = [
    ["Engine", bike.engine_cc != null ? `${bike.engine_cc} cc` : "-"],
    ["Power", bike.power_bhp != null ? `${bike.power_bhp} bhp` : "-"],
    ["Torque", bike.torque_nm != null ? `${bike.torque_nm} Nm` : "-"],
    ["Mileage", bike.mileage_kmpl != null ? `${bike.mileage_kmpl} km/l` : "-"],
    ["Top speed", bike.top_speed_kmph != null ? `${bike.top_speed_kmph} km/h` : "-"],
    ["Weight", bike.weight_kg != null ? `${bike.weight_kg} kg` : "-"],
    ["Fuel tank", bike.fuel_tank_litres != null ? `${bike.fuel_tank_litres} L` : "-"],
  ];

  const picked = isSelected(bike.id);
  const full = selected.length >= MAX_COMPARE && !picked;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/bikes" className="text-blue-600 hover:underline">← Back to bikes</Link>

        <div className="mt-4 bg-white rounded-xl shadow overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            {bike.image_url ? (
              <img src={bike.image_url} alt={bike.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-white text-4xl font-bold">{bike.brand.name}</span>
            )}
          </div>

          <div className="p-6">
            <p className="text-gray-500">{bike.brand.name} · {bike.brand.country}</p>
            <h1 className="text-3xl font-bold">{bike.name}</h1>
            <span className="inline-block mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
              {bike.category}
            </span>

            <p className="mt-4 text-3xl font-bold text-green-700">{formatPrice(bike.price_inr)}</p>
            <p className="text-xs text-gray-500">Approximate ex-showroom price</p>

            <h2 className="mt-6 text-xl font-semibold">Specifications</h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {specs.map(([label, value]) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => toggle(bike)}
              disabled={full}
              className={`mt-6 px-5 py-2 rounded-lg border font-medium ${
                picked
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              } ${full ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {picked ? "✓ Added to compare" : full ? "Compare list full" : "+ Add to compare"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}