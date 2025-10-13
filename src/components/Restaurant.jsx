import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Restaurant.css";
import Navbar from "./Navbar";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        let data = res.data;

        // Frontend filtering based on search term
        if (searchTerm) {
          const lowerSearch = searchTerm.toLowerCase();
          data = data.filter(
            (r) =>
              r.name.toLowerCase().includes(lowerSearch) ||
              (r.cuisineType && r.cuisineType.toLowerCase().includes(lowerSearch))
          );
        }

        setRestaurants(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load restaurants.");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [searchTerm]);

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="restaurants-page">
     <Navbar />

      <div className="restaurants-container">
        <h2>{searchTerm ? `Search Results for "${searchTerm}"` : "Restaurants"}</h2>
        <div className="restaurant-list">
          {restaurants.map((r) => {
            const imageUrl =
              r.imagePath && r.imagePath.trim() !== ""
                ? `http://localhost:8080/images/restaurants/${r.imagePath.trim()}`
                : "http://localhost:8080/images/restaurants/default.png";

            return (
              <div key={r.restaurantId} className="restaurant-card">
                <img
                  src={imageUrl}
                  alt={r.name}
                  className="restaurant-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "http://localhost:8080/images/restaurants/default.png";
                  }}
                />
                <div className="restaurant-info">
                  <h3>{r.name}</h3>
                  <p>Cuisine: {r.cuisineType || "N/A"}</p>
                  <p>Rating: {r.rating || "N/A"} ⭐</p>
                  <p>ETA: {r.eta || "-"} mins</p>
                  <p>Address: {r.address || "N/A"}</p>
                  <button
                    className="view-menu-btn"
                    onClick={() => navigate(`/menus/restaurant/${r.restaurantId}`)}
                  >
                    View Menu
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {restaurants.length === 0 && <p>No restaurants found.</p>}
      </div>
    </div>
  );
};

export default Restaurants;
