// todo: SPA -> React + React Router
// todo: API RESTful -> Node + Express
// todo: Registration (name, email, password), Login, Logout

// todo: Pages (register, login, menu, cart, profile, orders)
// todo: User session management
// todo: Axios
// todo: User Feedback
import { Route, HashRouter, Routes } from "react-router";
// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <>
    <HashRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/menu" element={<Register />} />
      <Route path="/order" element={<Order />} />
    </Routes>
    </HashRouter>
    </>
  );
}

export default App;