
import './App.css';
import Dashboard from './components/Dashboard';
import Login from "./components/Login"
import Register from "./components/Register";
import Restaurant from './components/Restaurant';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/restaurants" element={<Restaurant/>}></Route>


    </Routes>
   </Router>
  );
}

export default App;
