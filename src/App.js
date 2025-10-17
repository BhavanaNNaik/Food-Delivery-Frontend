import './App.css';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Register from "./components/Register";
import Restaurant from './components/Restaurant';
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';  
import Cart from "./components/Cart";
import Order from './components/Order';

function App() {
  return (
    <Router>
      <CartProvider>   
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/restaurants" element={<Restaurant/>}></Route>
          <Route path="/menus/restaurant/:restaurantId" element={<Menu/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/orders" element={<Order />}></Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
