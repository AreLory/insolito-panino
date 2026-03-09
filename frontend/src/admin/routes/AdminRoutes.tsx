import { Route, Routes } from "react-router";

import Products from "../pages/Products";
import ProtectedRoute from "../../utils/ProtectedRoute";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute userRole="admin" />}>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="products" element={<Products />} />
        {/* <Route path="orders" element={<Orders />} /> */}
      </Route>
    </Routes>
  );
}
