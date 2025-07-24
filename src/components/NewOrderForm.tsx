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
  // 🧾 Form input states
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

  // 🔽 Dropdown visibility states
  const [openCustomerDropdown, setOpenCustomerDropdown] = useState(false);
  const [openConsultantDropdown, setOpenConsultantDropdown] = useState(false);

  // 📋 Data from backend
  const [allCustomers, setAllCustomers] = useState<{ customerId: number; customerName: string; customerPhone: string; customerEmail: string }[]>([]);
  const [allConsultants, setAllConsultants] = useState<{ consultantId: number; consultantName: string; consultantPhone: string; consultantEmail: string }[]>([]);

  // Load customers and consultants on mount
  useEffect(() => {
    fetch("http://localhost:8080/customers")
      .then((res) => res.json())
      .then((data) => setAllCustomers(data))
      .catch((err) => console.error("Failed to load customers", err));

    fetch("http://localhost:8080/consultants")
      .then((res) => res.json())
      .then((data) => setAllConsultants(data))
      .catch((err) => console.error("Failed to load consultants", err));
  }, []);

  // Reset all inputs
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
      customerName.trim() === "" ||
      customerPhone.toString().trim() === "" ||
      customerEmail.trim() === "" ||
      consultantName.trim() === "" ||
      consultantPhone.toString().trim() === "" ||
      consultantEmail.trim() === "" ||
      !serviceId ||
      fromAddress.trim() === "" ||
      toAddress.trim() === "" ||
      scheduleDate.trim() === "" ||
      price.toString().trim() === ""
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
        headers: {
          "Content-Type": "application/json",
        },
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
    const confirm = window.confirm("Are you sure you want to cancel? All inputs will be lost.");
    if (confirm) {
      resetAllFields();
      alert("❌ Order canceled. All fields cleared.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-blue-100 text-center text-lg text-blue-800 p-4 rounded">
        ✅ Tailwind class applied!
      </div>

      <div className="max-w-7xl w-full mb-6 px-4">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-1">🆕 Create New Order</h1>
        <p className="text-gray-600 text-lg">Fill in the details below to create a new order.</p>
      </div>

      {/* 📦 All Cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl w-full">

        {/* Customer Card */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-blue-50">
          <CardHeader>
            <h2 className="text-blue-900 text-2xl font-extrabold mb-4">Customer</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            {/* Name with dropdown */}
            <div className="w-full max-w-[320px] relative">
              <label className="text-sm font-medium text-blue-700 mb-1 block">Customer Name</label>
              <Input
                value={customerName}
                placeholder="Type or select customer"
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setOpenCustomerDropdown(true);
                }}
                onBlur={() => setTimeout(() => setOpenCustomerDropdown(false), 200)}
                onFocus={() => {
                  if (customerName.trim() !== "") setOpenCustomerDropdown(true);
                }}
              />
              {openCustomerDropdown && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto shadow-md">
                  {allCustomers
                    .filter((c) => c.customerName.toLowerCase().includes(customerName.toLowerCase()))
                    .map((c) => (
                      <div
                        key={c.customerId}
                        className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                        onClick={() => {
                          setCustomerName(c.customerName);
                          setCustomerPhone(c.customerPhone);
                          setCustomerEmail(c.customerEmail);
                          setOpenCustomerDropdown(false);
                        }}
                      >
                        {c.customerName}
                      </div>
                    ))}
                  {allCustomers.filter((c) => c.customerName.toLowerCase().includes(customerName.toLowerCase())).length === 0 && (
                    <div className="px-3 py-2 text-gray-500 text-sm">No matching customer found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Phone and Email */}
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Phone</label>
              <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Enter phone number" />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Email</label>
              <Input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Enter email" />
            </div>
          </CardContent>
        </Card>

        {/* Consultant Card */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-green-50">
          <CardHeader>
            <h2 className="text-green-900 text-2xl font-extrabold mb-4">Consultant</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            {/* Name with dropdown */}
            <div className="w-full max-w-[320px] relative">
              <label className="text-sm font-medium text-green-700 mb-1 block">Consultant Name</label>
              <Input
                value={consultantName}
                placeholder="Type or select consultant"
                onChange={(e) => {
                  setConsultantName(e.target.value);
                  setOpenConsultantDropdown(true);
                }}
                onBlur={() => setTimeout(() => setOpenConsultantDropdown(false), 200)}
                onFocus={() => {
                  if (consultantName.trim() !== "") setOpenConsultantDropdown(true);
                }}
              />
              {openConsultantDropdown && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto shadow-md">
                  {allConsultants
                    .filter((c) => c.consultantName.toLowerCase().includes(consultantName.toLowerCase()))
                    .map((c) => (
                      <div
                        key={c.consultantId}
                        className="px-3 py-2 hover:bg-green-100 cursor-pointer text-sm"
                        onClick={() => {
                          setConsultantName(c.consultantName);
                          setConsultantPhone(c.consultantPhone);
                          setConsultantEmail(c.consultantEmail);
                          setOpenConsultantDropdown(false);
                        }}
                      >
                        {c.consultantName}
                      </div>
                    ))}
                  {allConsultants.filter((c) => c.consultantName.toLowerCase().includes(consultantName.toLowerCase())).length === 0 && (
                    <div className="px-3 py-2 text-gray-500 text-sm">No matching consultant found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Phone and Email */}
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Phone</label>
              <Input value={consultantPhone} onChange={(e) => setConsultantPhone(e.target.value)} placeholder="Enter phone number" />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Email</label>
              <Input value={consultantEmail} onChange={(e) => setConsultantEmail(e.target.value)} placeholder="Enter email" />
            </div>
          </CardContent>
        </Card>

        {/* Service Info Card */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-purple-50">
          <CardHeader>
            <h2 className="text-purple-900 text-2xl font-extrabold mb-4">Service Info</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">Service Type</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2" value={serviceId ?? ""} onChange={e => setserviceId(Number(e.target.value))}>
                <option value="">SELECT SERVICE</option>
                <option value="1">MOVING</option>
                <option value="2">PACKING</option>
                <option value="3">CLEANING</option>
                <option value="4">CLEANING DELUXE</option>
              </select>
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">From Address</label>
              <Input value={fromAddress} onChange={e => setFromAddress(e.target.value)} placeholder="Enter from address" />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">To Address</label>
              <Input value={toAddress} onChange={e => setToAddress(e.target.value)} placeholder="Enter to address" />
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Price */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-indigo-50">
          <CardHeader>
            <h2 className="text-indigo-900 text-2xl font-extrabold mb-4">Schedule & Price</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-indigo-700">Schedule Date</label>
              <Input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-indigo-700">Price (NOK)</label>
              <Input type="number" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-gray-50">
          <CardHeader>
            <h2 className="text-gray-900 text-2xl font-extrabold mb-4">Note</h2>
          </CardHeader>
          <CardContent className="p-6 max-w-[320px]">
            <Input placeholder="Enter any notes here (optional)" value={note} onChange={e => setNote(e.target.value)} />
          </CardContent>
        </Card>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6 max-w-7xl w-full px-8">
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSaveOrder} className="bg-blue-600 hover:bg-blue-700 text-white">Save Order</Button>
      </div>
    </div>
  );
}
