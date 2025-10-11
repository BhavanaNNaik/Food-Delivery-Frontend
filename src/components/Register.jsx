import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../css/Register.css";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "USER",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", user);
      setMessage("Registered successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("Error registering user.");
    }
  };

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      {message && <div className="error-message">{message}</div>}

      <form onSubmit={handleSubmit}>
       
  <input
    type="text"
    name="username"
    placeholder="Username"
    value={user.username}
    onChange={handleChange}
    required
    minLength={3}       
  />

  <input
    type="email"
    name="email"
    placeholder="Email"
    value={user.email}
    onChange={handleChange}
    required
    pattern="^[a-zA-Z0-9]+@gmail\.com$"   
    title="Enter a valid Gmail address"
    autoComplete="off"
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={user.password}
    onChange={handleChange}
    required
    minLength={6}
    title="Password must be at least 6 characters"
    autoComplete="new-password"
  />

  <input
    type="tel"
    name="phone"
    placeholder="Phone"
    value={user.phone}
    onChange={handleChange}
    required
    pattern="^[0-9]{10}$"
    title="Phone number must be exactly 10 digits"
  />

  <input
    type="text"
    name="address"
    placeholder="Address"
    value={user.address}
    onChange={handleChange}
    required
  />

  <button type="submit">Register</button>
</form>


       
      <p>
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
