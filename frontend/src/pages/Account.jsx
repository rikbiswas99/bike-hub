import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// A protected page: only logged-in users can see it.
export default function Account() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold">My Account</h1>

        <dl className="mt-6 space-y-3">
          <div>
            <dt className="text-sm text-gray-500">Name</dt>
            <dd className="font-semibold">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-semibold">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Member since</dt>
            <dd className="font-semibold">
              {new Date(user.created_at).toLocaleDateString("en-IN")}
            </dd>
          </div>
        </dl>

        <Link to="/bikes" className="inline-block mt-6 text-blue-600 hover:underline">
          ← Explore bikes
        </Link>
      </div>
    </main>
  );
}