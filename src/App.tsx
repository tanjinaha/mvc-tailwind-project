import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import external Home component
import Home from "./components/Home";

// ✅ Import all your other page components
import CustomerList from "./components/CustomerList";

import OrderDetailsList from "./components/OrderDetailsList";
import ServiceTypeList from "./components/ServiceTypeList";
import PlaceOrderForm from "./components/PlaceOrderForm";
import OrderOverviewPage from "./components/OrderOverviewPage";
import CustomerSearch from "./components/CustomerSearch";
import NewOrderForm from "./components/NewOrderForm";
import CustomerListCards from "./components/CustomerListCards";
import ConsultantList from "./components/ConsultantList";
import ConsultantListCards from "./components/ConsultantListCards";
import CompleteOrderList from "./components/CompleteOrderList";
import FindOrderPage from "./components/FindOrderPage";



export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Home page route */}
        <Route path="/" element={<Home />} />
       
        

        {/* ✅ Functional routes */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/cards" element={<CustomerListCards />} />

        <Route path="/consultants" element={<ConsultantList />} />
        <Route path="/consultants/cards" element={<ConsultantListCards />} />

        <Route path="/orders/details" element={<OrderDetailsList />} />
        <Route path="/orders/complete" element={<CompleteOrderList />} />

        <Route path="/service-types" element={<ServiceTypeList />} />
        <Route path="/new-order" element={<NewOrderForm />} />
        <Route path="/place-order" element={<PlaceOrderForm />} />

        <Route path="/overview" element={<OrderOverviewPage />} />
        <Route path="/find-order" element={<FindOrderPage />} />
        <Route path="/search-customers" element={<CustomerSearch />} />
      </Routes>
    </Router>
  );
}
