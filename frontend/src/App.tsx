// todo: SPA -> React + React Router
// todo: API RESTful -> Node + Express
// todo: Registration (name, email, password), Login, Logout

// todo: Pages (register, login, menu, cart, profile, orders)
// todo: User session management
// todo: Axios
// todo: User Feedback
import { Route, HashRouter, Routes } from "react-router";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
// Components
import BottomNav from "./components/Navbar";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/order" element={isAuthenticated ? <Order /> : <Login />} />
          <Route path='/profile' element={isAuthenticated ? <Profile /> : <Login />}/>
        </Routes>
        <div className="justify-center flex">
          <BottomNav />
        </div>
      </HashRouter>
    </>
  );
}

export default App;
