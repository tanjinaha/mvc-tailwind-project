import { useEffect, useState } from "react";

interface OrderDetails {
  orderId: number;
  customerName: string;
  consultantName: string;
  note: string;
  serviceType: string; // for displaying service name
  serviceId?: number;  // optional, used for backend update
  fromAddress: string;
  toAddress: string;
  scheduleDate: string;
  price: number;
}

// Map service names to their IDs for backend
const reverseServiceMap: Record<string, number> = {
  "MOVING": 1,
  "PACKING": 2,
  "CLEANING": 3,
  "DELUXE CLEANING": 4,
};

export default function OrderEditPractice() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editedOrder, setEditedOrder] = useState<Partial<OrderDetails>>({});

  useEffect(() => {
    fetch("http://localhost:8080/orders/details")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  const handleChange = (field: keyof OrderDetails, value: any) => {
    setEditedOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (orderId: number) => {
    const confirmSave = window.confirm("💾 Save changes?");
    if (!confirmSave) return;

    // Convert serviceType string to serviceId number before sending
    const converted = {
      ...editedOrder,
      serviceId: reverseServiceMap[editedOrder.serviceType as string],
    };

    try {
      await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(converted),
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, ...editedOrder } : order
        )
      );

      alert("✅ Order updated!");
      setEditingOrderId(null);
      setEditedOrder({});
    } catch (err) {
      alert("❌ Failed to update order.");
    }
  };

  const handleCancel = () => {
    setEditingOrderId(null);
    setEditedOrder({});
    alert("❌ Changes cancelled.");
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Edit Orders Practice</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Note</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Schedule</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isEditing = editingOrderId === order.orderId;
            return (
              <tr key={order.orderId} className="text-center">
                <td className="border p-2">{order.orderId}</td>

                {/* Note */}
                <td className="border p-2">
                  {isEditing ? (
                    <input
                      defaultValue={order.note}
                      onChange={(e) => handleChange("note", e.target.value)}
                      className="border rounded px-1"
                    />
                  ) : (
                    order.note
                  )}
                </td>

                {/* Service Dropdown */}
                <td className="border p-2">
                  {isEditing ? (
                    <select
                      defaultValue={order.serviceType}
                      onChange={(e) => handleChange("serviceType", e.target.value)}
                      className="border rounded px-1"
                    >
                      <option value="MOVING">MOVING</option>
                      <option value="PACKING">PACKING</option>
                      <option value="CLEANING">CLEANING</option>
                      <option value="DELUXE CLEANING">DELUXE CLEANING</option>
                    </select>
                  ) : (
                    order.serviceType
                  )}
                </td>

                {/* From Address */}
                <td className="border p-2">
                  {isEditing ? (
                    <input
                      defaultValue={order.fromAddress}
                      onChange={(e) => handleChange("fromAddress", e.target.value)}
                      className="border rounded px-1"
                    />
                  ) : (
                    order.fromAddress
                  )}
                </td>

                {/* To Address */}
                <td className="border p-2">
                  {isEditing ? (
                    <input
                      defaultValue={order.toAddress}
                      onChange={(e) => handleChange("toAddress", e.target.value)}
                      className="border rounded px-1"
                    />
                  ) : (
                    order.toAddress
                  )}
                </td>

                {/* Schedule Date */}
                <td className="border p-2">
                  {isEditing ? (
                    <input
                      type="date"
                      defaultValue={order.scheduleDate?.split("T")[0]}
                      onChange={(e) => handleChange("scheduleDate", e.target.value)}
                      className="border rounded px-1"
                    />
                  ) : (
                    new Date(order.scheduleDate).toLocaleDateString()
                  )}
                </td>

                {/* Price */}
                <td className="border p-2">
                  {isEditing ? (
                    <input
                      type="number"
                      defaultValue={order.price}
                      onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                      className="border rounded px-1"
                    />
                  ) : (
                    `${order.price} kr`
                  )}
                </td>

                {/* Actions */}
                <td className="border p-2 space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => handleSave(order.orderId)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditingOrderId(order.orderId);
                        setEditedOrder(order);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
