import { Route, Routes } from "react-router";

import AdminProducts from "../pages/AdminProducts";
import ProtectedRoute from "../../utils/ProtectedRoute";
import AdminHome from "../pages/AdminHome";
import AdminCategories from "../pages/AdminCategories";
import AdminExtras from "../pages/AdminExtras";
import AdminUsers from "../pages/AdminUsers";
import AdminOrders from "../pages/AdminOrders";
import AdminOrders2 from "../pages/AdminOrders2";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute userRole="admin" />}>
        <Route path="" element={<AdminHome />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="extras" element={<AdminExtras />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/arrosticini" element={<AdminOrders2 />} />
      </Route>
    </Routes>
  );
}
