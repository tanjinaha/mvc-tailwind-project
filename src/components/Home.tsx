// src/components/Home.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-50 to-white px-8 py-16">
      
      {/* LEFT: Welcome + Buttons */}
      <div className="max-w-xl text-center md:text-left space-y-8">
        <h1 className="text-5xl font-extrabold text-rose-900 leading-tight">
          Welcome to <span className="text-orange-500">Moving Company</span> App
        </h1>

        <p className="text-lg text-gray-700">
          Handle your entire service process — from moving and packing to customer care — all in one place.
        </p>

        {/* START HERE SECTION */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-rose-800">🚀 Start Here</h2>
          <Link to="/service-types"><Button className="w-full bg-orange-400 hover:bg-orange-500 text-white">🧭 Service Types</Button></Link>
          <Link to="/new-order"><Button className="w-full">📦 Create New Order</Button></Link>
        </div>

        {/* CUSTOMER SECTION */}
        <div className="space-y-2 pt-6">
          <h2 className="text-xl font-bold text-rose-800">👥 Customers</h2>
          <Link to="/customers"><Button variant="outline" className="w-full">📄 Customer List View</Button></Link>
          <Link to="/customers/cards"><Button variant="outline" className="w-full">💳 Customer Card View</Button></Link>
        </div>

        {/* CONSULTANT SECTION */}
        <div className="space-y-2 pt-6">
          <h2 className="text-xl font-bold text-rose-800">🧑‍💼 Consultants</h2>
          <Link to="/consultants"><Button variant="outline" className="w-full">📄 Consultant List View</Button></Link>
          <Link to="/consultants/cards"><Button variant="outline" className="w-full">💳 Consultant Card View</Button></Link>
        </div>

        {/* ORDER SECTION */}
        <div className="space-y-2 pt-6">
          <h2 className="text-xl font-bold text-rose-800">📦 Orders</h2>
          <Link to="/orders/details"><Button variant="outline" className="w-full">🗂️ Order Details</Button></Link>
          <Link to="/orders/complete"><Button variant="outline" className="w-full">✅ Complete Orders</Button></Link>
          <Link to="/overview"><Button variant="outline" className="w-full">📊 Order Overview</Button></Link>
          <Link to="/find-order"><Button variant="outline" className="w-full">🔍 Find Order</Button></Link>
        </div>

        {/* Footer Line */}
        <p className="text-sm text-pink-500 pt-8">Made with 💖 to make moving easier</p>
      </div>

      {/* RIGHT: Illustration */}
      <div className="mt-12 md:mt-0 md:ml-12 w-full md:w-1/2 flex justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2143/2143953.png"
          alt="Moving house illustration"
          className="w-80 h-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
