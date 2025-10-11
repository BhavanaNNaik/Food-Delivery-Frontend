
import './App.css';
import Login from "./components/Login"
import Register from "./components/Register";
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/restaurants" element={<Restaurant/>}></Route>

    </Routes>
   </Router>
  );
}

export default App;
