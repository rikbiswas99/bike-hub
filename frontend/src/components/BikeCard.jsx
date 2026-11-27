import { Link } from "react-router-dom";
import { useCompare, MAX_COMPARE } from "../context/CompareContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function BikeCard({ bike }) {
  const { selected, isSelected, toggle } = useCompare();
  const picked = isSelected(bike.id);
  const full = selected.length >= MAX_COMPARE && !picked;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Clicking the picture or the name opens the details page */}
      <Link to={`/bikes/${bike.id}`}>
        <div className="h-36 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
          {bike.image_url ? (
            <img src={bike.image_url} alt={bike.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-white text-2xl font-bold tracking-wide">{bike.brand.name}</span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-sm text-gray-500">{bike.brand.name}</p>
        <Link to={`/bikes/${bike.id}`} className="text-lg font-semibold hover:text-blue-600">
          {bike.name}
        </Link>
        <div>
          <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {bike.category}
          </span>
        </div>

        <p className="mt-3 text-xl font-bold text-green-700">{formatPrice(bike.price_inr)}</p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="font-semibold">{bike.engine_cc} cc</p>
            <p className="text-gray-500 text-xs">Engine</p>
          </div>
          <div>
            <p className="font-semibold">{bike.power_bhp} bhp</p>
            <p className="text-gray-500 text-xs">Power</p>
          </div>
          <div>
            <p className="font-semibold">{bike.mileage_kmpl} km/l</p>
            <p className="text-gray-500 text-xs">Mileage</p>
          </div>
        </div>

        <button
          onClick={() => toggle(bike)}
          disabled={full}
          className={`mt-4 w-full py-2 rounded-lg border text-sm font-medium ${
            picked
              ? "bg-blue-600 text-white border-blue-600"
              : "border-blue-600 text-blue-600 hover:bg-blue-50"
          } ${full ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {picked ? "✓ Added to compare" : full ? "Compare list full" : "+ Compare"}
        </button>
      </div>
    </div>
  );
}