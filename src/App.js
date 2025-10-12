
import './App.css';
import Dashboard from './components/Dashboard';
import Login from "./components/Login"
import Register from "./components/Register";
import Restaurant from './components/Restaurant';
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/restaurants" element={<Restaurant/>}></Route>
      <Route path="/menus/restaurant/:restaurantId" element={<Menu/>}></Route>


    </Routes>
   </Router>
  );
}

export default App;
