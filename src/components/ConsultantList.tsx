// src/components/ConsultantList.tsx
import { useEffect, useState } from "react";

// Define the structure of a Consultant object
interface Consultant {
  consultantId: number;
  consultantName: string;
  consultantPhone: number;
  consultantEmail: string;
}

export default function ConsultantList() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when component loads
  useEffect(() => {
    fetch("http://localhost:8080/consultants") // ✅ URL is case-sensitive!
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch consultants");
        return response.json();
      })
      .then((data) => {
        setConsultants(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading consultants...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div className="p-6 max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🔍 Find Consultant by Name</h2>

    <ul className="border border-gray-300 rounded-lg divide-y divide-gray-200 bg-white shadow">
      {consultants.map((c) => (
        <li key={c.consultantId} className="p-4 hover:bg-blue-50 transition-all text-lg">
          {c.consultantName}
        </li>
      ))}
    </ul>
  </div>
);

}
