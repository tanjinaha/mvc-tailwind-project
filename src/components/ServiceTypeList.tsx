import { useEffect, useState } from "react";

// Define one service type (from backend)
interface ServiceType {
  serviceId: number;
  serviceName: "MOVING" | "CLEANING" | "PACKING" | "CLEANING_DELUXE";
}

export default function ServiceTypeList() {
  const [types, setTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/servicetypes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch service types");
        return res.json();
      })
      .then((data: ServiceType[]) => {
        setTypes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20 text-blue-700">Loading service types…</div>;
  if (error) return <div className="text-center mt-20 text-red-600">Error: {error}</div>;

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/servicetype.jpg')",
      }}
    >
      {/* 💙 Light blue transparent overlay — no blur */}
      <div className="absolute inset-0 bg-blue-100/40 z-0" />

      {/* 📦 Card content */}
      <div className="relative z-10 max-w-xl w-full p-6 bg-white rounded-2xl shadow-xl space-y-6 border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          🛠️ Service Type List
        </h2>

        <ul className="space-y-4">
          {types.map((t) => (
            <li
              key={t.serviceId}
              className="flex items-center gap-4 px-4 py-3 bg-indigo-50 rounded-xl shadow hover:bg-indigo-100 transition duration-300"
            >
              <span className="text-4xl">
                {t.serviceName === "MOVING" && "🚚"}
                {t.serviceName === "CLEANING" && "🧹"}
                {t.serviceName === "PACKING" && "📦"}
                {t.serviceName === "CLEANING_DELUXE" && "🛁"}
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {t.serviceId}. {t.serviceName.replace("_", " ")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
