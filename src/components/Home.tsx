import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div
            className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-cover bg-center bg-no-repeat px-8 py-16"
            style={{ backgroundImage: "url('/mvc_front_page.jpg')" }}
        >

            {/* LEFT: Welcome + Buttons */}
            <div className="max-w-xl text-center md:text-left space-y-8 bg-gradient-to-b from-teal-50 via-blue-50 to-blue-100 p-8 rounded-xl shadow-lg">
                <h1 className="text-5xl font-extrabold text-teal-900 leading-tight">
                    Welcome to <span className="text-teal-600">Moving Company</span> App
                </h1>

                <p className="text-lg text-teal-800">
                    Handle your entire service process — from moving and packing to customer care — all in one place.
                </p>

                {/* START HERE SECTION */}
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-teal-700">🚀 Start Here</h2>
                    <Link to="/service-types">
                        <Button
                            variant="outline"
                            className="w-full border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            🧭 Service Types
                        </Button>
                    </Link>
                    <Link to="/new-order">
                        <Button
                            variant="outline"
                            className="w-full border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            📦 Create New Order
                        </Button>
                    </Link>

                </div>

                {/* CUSTOMER SECTION */}
                <div className="space-y-2 pt-8">
                    <h2 className="text-xl font-bold text-teal-700">👥 Customers</h2>
                    <Link to="/customers">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            📄 Customer List View
                        </Button>
                    </Link>
                    <Link to="/customers/cards">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            💳 Customer Details 
                        </Button>
                    </Link>
                </div>

                {/* CONSULTANT SECTION */}
                <div className="space-y-2 pt-8">
                    <h2 className="text-xl font-bold text-teal-700">🧑‍💼 Consultants</h2>
                    <Link to="/consultants">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            📄 Consultant List View
                        </Button>
                    </Link>
                    <Link to="/consultants/cards">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            💳 Consultant Details
                        </Button>
                    </Link>
                </div>

                {/* ORDER SECTION */}
                <div className="space-y-2 pt-8">
                    <h2 className="text-xl font-bold text-teal-700">📦 Orders</h2>
                    <Link to="/orders/details">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            🗂️ Edit Existing Orders
                        </Button>
                    </Link>
                    <Link to="/orders/complete">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            ✅ Final Order Details 
                        </Button>
                    </Link>
                    <Link to="/overview">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            📊 Order Notes from Customers
                        </Button>
                    </Link>
                    <Link to="/find-order">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-teal-400 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition duration-300"
                        >
                            🔍 Find Order
                        </Button>
                    </Link>
                </div>

                {/* Footer Line */}
                <p className="text-sm text-teal-400 pt-10 font-semibold">Made with 💖 to make moving easier</p>
            </div>

            

        </div>
    );
}
