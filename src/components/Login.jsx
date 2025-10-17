import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../css/Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/login", { email, password });
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/restaurants");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <input
      type="email"
      value={email}
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      required
      autoComplete="off"
    />
    <input
      type="password"
      value={password}
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      required
      autoComplete="new-password"
    />
    <button type="submit">Login</button>

    {error && <p className="error-message">{error}</p>}

    <p>
      Don't have an account? <Link to="/dashboard">Register here</Link>
    </p>
  </form>
</div>

  );
};

export default Login;
