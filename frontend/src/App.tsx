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
// Components
import BottomNav from "./components/BottomNav";



function AppLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();


  const hideBottomNavRoutes = ["/product", '/checkout'];

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
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
        <Route path="/checkout" element={isAuthenticated ? <Checkout/> : <Login/>}/>
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
