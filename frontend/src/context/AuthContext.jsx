import { createContext, useContext, useEffect, useState } from "react";
import api, { TOKEN_KEY } from "../api/axios.js";

// Shared memory: who is logged in? Every page can read it.
const AuthContext = createContext(null);

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // If a saved token exists, we first ask the server who it belongs to
  const [loading, setLoading] = useState(() => Boolean(readToken()));

  useEffect(() => {
    if (!readToken()) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        // Token is old or fake: forget it
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    // The backend login expects form data, with the email in a field called "username"
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    const res = await api.post("/auth/login", form);
    localStorage.setItem(TOKEN_KEY, res.data.access_token);

    const me = await api.get("/auth/me");
    setUser(me.data);
  };

  const register = async (name, email, password) => {
    await api.post("/auth/register", { name, email, password });
    await login(email, password); // log the new user in straight away
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);