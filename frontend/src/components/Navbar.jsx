import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="h-16 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">BIKE-HUB</Link>
          <Link to="/bikes" className="text-slate-300 hover:text-white">Bikes</Link>
        </div>

        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <Link to="/account" className="text-slate-300 hover:text-white">
                Hi, {user.name.split(" ")[0]}
              </Link>
              {/* After logout, protected pages send you to the login page by themselves */}
              <button
                onClick={logout}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-1.5 rounded-lg text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}