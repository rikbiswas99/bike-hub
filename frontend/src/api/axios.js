import axios from "axios";

export const TOKEN_KEY = "bikehub_token";

// One shared Axios instance. Every API call in the app will use this.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Before every request: if the user is logged in, attach the token (the "ticket")
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // localStorage not available: continue without a token
  }
  return config;
});

export default api;