import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import { formatPrice } from "../utils/format.js";

// Each row: label, how to read the value, how to show it,
// and which value is "best" ("high", "low", or null = no highlight)
const ROWS = [
  { label: "Price", get: (b) => b.price_inr, show: (v) => formatPrice(v), best: "low" },
  { label: "Category", get: (b) => b.category, show: (v) => v, best: null },
  { label: "Engine", get: (b) => b.engine_cc, show: (v) => `${v} cc`, best: null },
  { label: "Power", get: (b) => b.power_bhp, show: (v) => `${v} bhp`, best: "high" },
  { label: "Torque", get: (b) => b.torque_nm, show: (v) => `${v} Nm`, best: "high" },
  { label: "Mileage", get: (b) => b.mileage_kmpl, show: (v) => `${v} km/l`, best: "high" },
  { label: "Top speed", get: (b) => b.top_speed_kmph, show: (v) => `${v} km/h`, best: "high" },
  { label: "Weight", get: (b) => b.weight_kg, show: (v) => `${v} kg`, best: "low" },
  { label: "Fuel tank", get: (b) => b.fuel_tank_litres, show: (v) => `${v} L`, best: "high" },
];

export default function Compare() {
  const [params] = useSearchParams();
  const ids = params.get("ids"); // from the address: /compare?ids=1,4,7
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ids) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    api
      .get("/bikes/compare", { params: { ids } })
      .then((res) => setBikes(res.data))
      .catch((err) => setError(err.response?.data?.detail || "Could not load the bikes."))
      .finally(() => setLoading(false));
  }, [ids]);

  // Find the best value of a row (only if the values are not all the same)
  const bestValue = (row) => {
    if (!row.best) return null;
    const values = bikes.map(row.get).filter((v) => typeof v === "number");
    if (values.length < 2 || new Set(values).size === 1) return null;
    return row.best === "high" ? Math.max(...values) : Math.min(...values);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Compare Bikes</h1>
          <Link to="/bikes" className="text-blue-600 hover:underline">← Back to bikes</Link>
        </div>

        {loading && <p className="mt-8 text-gray-600">Loading...</p>}
        {!ids && !loading && (
          <p className="mt-8 text-gray-600">
            No bikes chosen yet. Go to the bikes page and press "+ Compare" on 2 or 3 bikes.
          </p>
        )}
        {error && <p className="mt-8 text-red-600">{error}</p>}

        {bikes.length > 0 && !error && (
          <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4 w-32"></th>
                  {bikes.map((b) => (
                    <th key={b.id} className="p-4">
                      <p className="text-sm font-normal text-gray-500">{b.brand.name}</p>
                      <Link to={`/bikes/${b.id}`} className="text-lg hover:text-blue-600">
                        {b.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => {
                  const best = bestValue(row);
                  return (
                    <tr key={row.label} className="border-b last:border-0">
                      <td className="p-4 text-gray-600 font-medium">{row.label}</td>
                      {bikes.map((b) => {
                        const value = row.get(b);
                        const isBest = best !== null && value === best;
                        return (
                          <td
                            key={b.id}
                            className={`p-4 ${isBest ? "bg-green-100 font-semibold text-green-800" : ""}`}
                          >
                            {value == null ? "-" : row.show(value)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {bikes.length > 0 && !error && (
          <p className="mt-3 text-sm text-gray-500">
            Green = best value in that row (lowest price and weight, highest power, torque, mileage, top speed and tank size).
          </p>
        )}
      </div>
    </main>
  );
}