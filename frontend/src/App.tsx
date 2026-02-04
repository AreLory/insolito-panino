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
import Order from "./pages/Order";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
// Components
import BottomNav from "./components/BottomNav";
import OrderHistory from "./pages/OrderHistory";
import Product from "./pages/Product";


function AppLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();


  const hideBottomNavRoutes = ["/product"];

  const hideBottomNav = hideBottomNavRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={isAuthenticated ? <Order /> : <Login />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
        <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Login />} />
      </Routes>

      {!hideBottomNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}
