import { Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import OrderHistory from "./pages/OrderHistry";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/menu" element={<Menu />} />

      <Route path="/orders" element={<OrderHistory />}
/>
      
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;