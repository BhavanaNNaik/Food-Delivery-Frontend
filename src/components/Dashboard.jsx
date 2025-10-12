import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // navigate to restaurants page with query param
    navigate(`/restaurants?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleExplore = () => {
    navigate("/restaurants");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="logo">FoodieExpress</div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <form
            className="search-bar"
            style={{ display: "flex", alignItems: "center", width: "350px", maxWidth: "100%" }}
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                padding: "8px 16px",
                borderRadius: "20px 0 0 20px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                borderRight: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "white",
                color: "black",
                border: "1px solid black",
                borderRadius: "0 20px 20px 0",
                padding: "8px 20px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to FoodieExpress 🍴</h1>
          <p>Order your favorite meals from the best restaurants near you — hot and fresh!</p>
          <button className="explore-btn" onClick={handleExplore}>
            Explore Restaurants 🍔
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 FoodieExpress — Delivering Happiness at Your Doorstep</p>
      </footer>
    </div>
  );
};

export default Dashboard;
