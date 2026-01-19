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

function App() {

  return (
    <>
    <HashRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/menu" element={<Menu />} />
      <Route path="/order" element={<Order />} />
    </Routes>
    </HashRouter>
    </>
  );
}

export default App;