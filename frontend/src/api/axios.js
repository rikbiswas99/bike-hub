import axios from "axios";

// One shared Axios instance. Every API call in the app will use this.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export default api;
