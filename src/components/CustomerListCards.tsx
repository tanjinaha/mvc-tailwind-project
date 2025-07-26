import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Customer {
  customerId: number;
  customerName: string;
  customerPhone: number;
  customerEmail: string;
}

export default function CustomerListCards() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/customers")
      .then(r => r.json())
      .then(data => setCustomers(data));
  }, []);

  return (
    // 💙 Bluish gradient background with full screen height
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      {/* Content container */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">Customer Details</h2>

        <Link to="/overview" className="text-blue-700 underline mb-6 block">← Back to Orders</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map(customer => (
            <Card key={customer.customerId} className="p-4 shadow-lg rounded-xl bg-white">
              <CardHeader>
                <CardTitle>{customer.customerName}</CardTitle>
                <CardDescription>ID: {customer.customerId}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>📞 Phone: {customer.customerPhone}</p>
                <p>📧 Email: {customer.customerEmail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
