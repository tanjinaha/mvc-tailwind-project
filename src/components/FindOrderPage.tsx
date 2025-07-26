import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FindOrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a customer name");
      return;
    }

    const url = `http://localhost:8080/orders/search?customerName=${encodeURIComponent(searchTerm.trim())}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Not found");

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      alert("❌ No orders found for this customer");
      setOrders([]);
    }
  };

  return (
    <div
      className="min-h-screen w-full p-6 flex justify-center items-start"
      style={{
        backgroundImage: 'url(/orderdetail.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f8ff' // optional light blue fallback
      }}
    >

      <div className="max-w-xl w-full bg-white bg-opacity-90 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">🔍 Find Orders by Customer Name</h2>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="mt-4">
          {orders.length === 0 ? (
            <p className="text-gray-500">No results yet.</p>
          ) : (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">🔍 Search Results:</h3>
              <table className="w-full border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">Order ID</th>
                    <th className="border px-2 py-1">Customer</th>
                    <th className="border px-2 py-1">Consultant</th>
                    <th className="border px-2 py-1">Note</th>
                    <th className="border px-2 py-1">Service</th>
                    <th className="border px-2 py-1">From</th>
                    <th className="border px-2 py-1">To</th>
                    <th className="border px-2 py-1">Schedule</th>
                    <th className="border px-2 py-1">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId} className="text-center border-t">
                      <td className="border px-2 py-1">{order.orderId}</td>
                      <td className="border px-2 py-1">{order.customerName}</td>
                      <td className="border px-2 py-1">{order.consultantName}</td>
                      <td className="border px-2 py-1">{order.note}</td>
                      <td className="border px-2 py-1">{order.serviceType}</td>
                      <td className="border px-2 py-1">{order.fromAddress}</td>
                      <td className="border px-2 py-1">{order.toAddress}</td>
                      <td className="border px-2 py-1">
                        {new Date(order.scheduleDate).toLocaleDateString()}
                      </td>
                      <td className="border px-2 py-1">{order.price} kr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
