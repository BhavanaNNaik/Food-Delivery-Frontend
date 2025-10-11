
import './App.css';
import Login from "../src/components/Login"
import Register from "..src/components/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>

    </Routes>
   </Router>
  );
}

export default App;
