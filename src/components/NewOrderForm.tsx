// src/components/NewOrderForm.tsx

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function NewOrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [consultantName, setConsultantName] = useState("");
  const [consultantPhone, setConsultantPhone] = useState("");
  const [consultantEmail, setConsultantEmail] = useState("");
  const [serviceId, setserviceId] = useState<number | null>(null);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  const resetAllFields = () => {
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setConsultantName("");
    setConsultantPhone("");
    setConsultantEmail("");
    setserviceId(null);
    setFromAddress("");
    setToAddress("");
    setScheduleDate("");
    setPrice("");
    setNote("");
  };

  const handleSaveOrder = async () => {
    if (
      !customerName ||
      !customerPhone ||
      !customerEmail ||
      !consultantName ||
      !consultantPhone ||
      !consultantEmail ||
      !serviceId ||
      !fromAddress ||
      !toAddress ||
      !scheduleDate ||
      !price
    ) {
      alert("⚠️ Please fill in all required fields before saving.");
      return;
    }

    const confirm = window.confirm("Are you sure you want to save this order?");
    if (!confirm) return;

    const newOrder = {
      customerName,
      customerPhone,
      customerEmail,
      consultantName,
      consultantPhone,
      consultantEmail,
      serviceId,
      fromAddress,
      toAddress,
      scheduleDate,
      price,
      note,
    };

    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        alert("✅ Order saved successfully!");
        resetAllFields();
      } else {
        const error = await response.text();
        alert("❌ Failed to save order: " + error);
      }
    } catch (err) {
      alert("⚠️ Error: " + err);
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (confirm) {
      resetAllFields();
      alert("❌ Order canceled. All fields cleared.");
    }
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-white">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-6">🆕 Create New Order</h1>
      <p className="text-gray-600 text-xl mb-10">Fill in the details below to create a new order.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        <Card className="bg-blue-50 w-full">
          <CardHeader>
            <h2 className="text-3xl font-bold text-blue-800">Customer</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input className="text-lg py-4 px-6 w-full" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <Input className="text-lg py-4 px-6 w-full" placeholder="Customer Phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            <Input className="text-lg py-4 px-6 w-full" placeholder="Customer Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
          </CardContent>
        </Card>

        <Card className="bg-green-50 w-full">
          <CardHeader>
            <h2 className="text-3xl font-bold text-green-800">Consultant</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input className="text-lg py-4 px-6 w-full" placeholder="Consultant Name" value={consultantName} onChange={(e) => setConsultantName(e.target.value)} />
            <Input className="text-lg py-4 px-6 w-full" placeholder="Consultant Phone" value={consultantPhone} onChange={(e) => setConsultantPhone(e.target.value)} />
            <Input className="text-lg py-4 px-6 w-full" placeholder="Consultant Email" value={consultantEmail} onChange={(e) => setConsultantEmail(e.target.value)} />
          </CardContent>
        </Card>

        <Card className="bg-purple-50 w-full">
          <CardHeader>
            <h2 className="text-3xl font-bold text-purple-800">Service Info</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <select className="text-lg py-4 px-6 w-full rounded border" value={serviceId ?? ""} onChange={(e) => setserviceId(Number(e.target.value))}>
              <option value="">Select Service</option>
              <option value="1">MOVING</option>
              <option value="2">PACKING</option>
              <option value="3">CLEANING</option>
              <option value="4">CLEANING DELUXE</option>
            </select>
            <Input className="text-lg py-4 px-6 w-full" placeholder="From Address" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
            <Input className="text-lg py-4 px-6 w-full" placeholder="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
          </CardContent>
        </Card>

        <Card className="bg-indigo-50 w-full">
          <CardHeader>
            <h2 className="text-3xl font-bold text-indigo-800">Schedule & Price</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input className="text-lg py-4 px-6 w-full" type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
            <Input className="text-lg py-4 px-6 w-full" placeholder="Price (NOK)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </CardContent>
        </Card>

        <Card className="bg-gray-50 w-full">
          <CardHeader>
            <h2 className="text-3xl font-bold text-gray-800">Note</h2>
          </CardHeader>
          <CardContent>
            <Input className="text-lg py-4 px-6 w-full" placeholder="Enter any notes here (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-6 mt-10 w-full max-w-6xl">
        <Button variant="outline" onClick={handleCancel} className="text-lg px-6 py-3">Cancel</Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-6 py-3" onClick={handleSaveOrder}>Save Order</Button>
      </div>
    </div>
  );
}