// Import React hooks: useState to store data, useEffect to fetch data after component mounts
import { useEffect, useState } from "react";

/**
 * Type definition for one service type object
 * Matches one row from the /servicetypes API endpoint
 */
interface ServiceType {
  serviceId: number; // Unique ID for the service type (primary key from database)
  serviceName: "MOVING" | "CLEANING" | "PACKING" | "CLEANING_DELUXE"; // Allowed enum values
}

/**
 * This component fetches and displays a list of service types from the backend.
 * It's a read-only list view of enum-based service types like MOVING, CLEANING, etc.
 */
export default function ServiceTypeList() {
  // State variable to hold the array of service types
  const [types, setTypes] = useState<ServiceType[]>([]);

  // State variable to track if the data is still being loaded
  const [loading, setLoading] = useState(true);

  // State variable to store an error message if fetch fails
  const [error, setError] = useState<string | null>(null);

  /**
   * useEffect will run once after the component mounts
   * It will fetch data from the backend API and update the state
   */
  useEffect(() => {
    // Fetch data from your Spring Boot backend
    fetch("http://localhost:8080/servicetypes")
      .then((res) => {
        // If the response is not successful, throw an error
        if (!res.ok) {
          throw new Error("Failed to fetch service types");
        }
        // Convert response body to JSON
        return res.json();
      })
      .then((data: ServiceType[]) => {
        // Save the fetched data to state
        setTypes(data);
        setLoading(false); // Data is loaded, stop loading indicator
      })
      .catch((err) => {
        // If something went wrong, store the error message
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once (on first render)

  // If data is still loading, show a loading message
  if (loading) return <div>Loading service types…</div>;

  // If there was an error, display it to the user
  if (error) return <div>Error: {error}</div>;

  // When data is loaded and there is no error, render the list
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">🛠️ Service Type List</h2>
        <ul className="space-y-4">
          {types.map((t) => (
            <li
              key={t.serviceId}
              className="flex items-center gap-3 border p-3 rounded-lg shadow-sm bg-indigo-50"
            >
              <span className="text-8xl">
                {t.serviceName === "MOVING" && "🚚"}
                {t.serviceName === "CLEANING" && "🧹"}
                {t.serviceName === "PACKING" && "📦"}
                {t.serviceName === "CLEANING_DELUXE" && "🛁"}
              </span>
              <span className="text-lg font-medium text-gray-800">
                {t.serviceId}. {t.serviceName.replace("_", " ")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}