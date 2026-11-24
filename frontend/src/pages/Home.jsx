import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Home() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    api
      .get("/health")
      .then((res) => setStatus(res.data.status === "ok" ? "connected" : "error"))
      .catch(() => setStatus("error"));
  }, []);

  const color = {
    checking: "text-yellow-600",
    connected: "text-green-600",
    error: "text-red-600",
  }[status];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold">BIKE-HUB</h1>
      <p className="mt-2 text-gray-600">AI-Powered Bike Recommendation and Used Bike Marketplace</p>
      <p className="mt-6">
        Backend status: <span className={`font-semibold ${color}`}>{status}</span>
      </p>
    </main>
  );
}
