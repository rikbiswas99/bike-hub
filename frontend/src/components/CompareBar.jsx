import { Link, useLocation } from "react-router-dom";
import { useCompare, MAX_COMPARE } from "../context/CompareContext.jsx";

// A bar at the bottom of the screen that shows the bikes you picked.
export default function CompareBar() {
  const { selected, remove, clear } = useCompare();
  const { pathname } = useLocation();

  if (selected.length === 0 || pathname === "/compare") return null;

  const ids = selected.map((b) => b.id).join(",");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-10">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
        <span className="font-semibold">
          Compare ({selected.length}/{MAX_COMPARE})
        </span>

        {selected.map((b) => (
          <span key={b.id} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {b.brandName} {b.name}
            <button onClick={() => remove(b.id)} className="ml-2 font-bold" aria-label="Remove">
              ×
            </button>
          </span>
        ))}

        <div className="ml-auto flex items-center gap-3">
          <button onClick={clear} className="text-sm text-gray-600 hover:underline">
            Clear
          </button>
          {selected.length >= 2 ? (
            <Link
              to={`/compare?ids=${ids}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Compare now
            </Link>
          ) : (
            <span className="text-sm text-gray-500">Pick at least 2 bikes</span>
          )}
        </div>
      </div>
    </div>
  );
}