import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ✅ Interface matching OrderDetailsDTO from backend
interface OrderDetails {
  customerName: string;
  consultantName: string;
  note: string;
}

export default function OrderOverviewPage() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch order data when page loads
  useEffect(() => {
    fetch("http://localhost:8080/orders/details")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex flex-col items-center">
      {/* 🔗 Navigation buttons */}
      <div className="mb-4 space-x-4">
        <Link to="/customers/cards">
          <Button className="bg-blue-600 text-white">View All Customers</Button>
        </Link>
        <Link to="/consultants/cards">
          <Button className="bg-purple-600 text-white">View All Consultants</Button>
        </Link>
      </div>

      {/* ✅ Page title */}
      <h2 className="text-3xl font-bold mb-4 text-blue-800">
        📝 Order Notes from Customers
      </h2>

      {/* ✅ Styled Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full max-w-5xl">
        <table className="min-w-full table-auto border border-blue-400 text-center">
          <thead className="bg-blue-200">
            <tr>
              <th className="p-2 border-b-2 border-blue-600">Customer</th>
              <th className="p-2 border-b-2 border-blue-600">Consultant</th>
              <th className="p-2 border-b-2 border-blue-600 text-red-700 font-semibold">Note</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-blue-300 hover:bg-blue-50"
              >
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">{order.consultantName}</td>
                <td className="p-2 text-red-600 font-medium whitespace-pre-wrap break-words max-w-xs">
                  {order.note}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
