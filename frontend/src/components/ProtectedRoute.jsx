import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wrap a page with this and only logged-in people can open it.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <main className="p-6">Loading...</main>;

  if (!user) {
    // Send them to the login page, and remember where they wanted to go
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}