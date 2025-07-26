// src/components/CompleteOrderList.tsx
import { useEffect, useState } from "react";

interface OrderDetails {
  orderId: number;
  customerName: string;
  consultantName: string;
  note: string;
  serviceType: string;
  fromAddress: string;
  toAddress: string;
  scheduleDate: string;
  price: number;
}

export default function CompleteOrderList() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  // 🔄 Fetch data on mount
  useEffect(() => {
    fetch("http://localhost:8080/orders/details")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  // ✅ Filter only complete orders
  const completeOrders = orders.filter(order =>
    order.serviceType !== "No service" &&
    order.scheduleDate !== "1970-01-01" &&
    order.price !== null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-7xl mx-auto bg-white bg-opacity-95 rounded-xl shadow-xl p-8">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
          ✅ Complete Orders (Read-Only)
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead className="bg-blue-100 text-gray-800 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Consultant</th>
                <th className="px-4 py-3 text-left">Note</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Schedule</th>
                <th className="px-4 py-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completeOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">{order.consultantName}</td>
                  <td className="px-4 py-2">{order.note}</td>
                  <td className="px-4 py-2">{order.serviceType}</td>
                  <td className="px-4 py-2">{order.fromAddress}</td>
                  <td className="px-4 py-2">{order.toAddress}</td>
                  <td className="px-4 py-2">
                    {new Date(order.scheduleDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{order.price} kr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
