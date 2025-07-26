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
    <div
      className="min-h-screen w-full bg-cover bg-center p-6 flex justify-center"
      style={{ backgroundImage: 'url(/consultantcard.jpg)' }}
    >
      <div className="max-w-2xl w-full bg-white bg-opacity-90 rounded-lg p-6 shadow">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🔍 Find Consultant by Name
        </h2>

        <ul className="border border-gray-300 rounded-lg divide-y divide-gray-200">
          {consultants.map((c) => (
            <li key={c.consultantId} className="p-4 hover:bg-blue-50 transition-all text-lg">
              {c.consultantName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}
