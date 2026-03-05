// todo: SPA -> React + React Router
// todo: API RESTful -> Node + Express
// todo: Registration (name, email, password), Login, Logout

// todo: Pages (register, login, menu, cart, profile, orders)
// todo: User session management
// todo: Axios
// todo: User Feedback
import { Route, HashRouter, Routes, useLocation } from "react-router";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import OrdersHistory from "./pages/OrdersHistory";
import { AlertContainer } from "./components/shared/Alert";
import ProtectedRoute from "./utils/ProtectedRoute";

function AppLayout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/orders-history" element={<OrdersHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AlertContainer />
      <AppLayout />
    </HashRouter>
  );
}
