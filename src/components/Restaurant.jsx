import { useEffect, useState } from "react";
import api from "../services/api";
import "../css/Restaurant.css";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        console.log("Restaurants fetched:", res.data);
        setRestaurants(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants.");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p className="loading">Loading restaurants...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="restaurants-container">
      <h2>Restaurants</h2>
      <div className="restaurant-list">
        {restaurants.map((r) => (
          <div key={r.restaurantId} className="restaurant-card">
            <img
              src={
                r.imagePath && r.imagePath.trim() !== ""
                  ? `http://localhost:8080/images/restaurants/${r.imagePath.trim()}`
                  : "http://localhost:8080/images/restaurants/default.png"
              }
              alt={r.name}
              className="restaurant-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "http://localhost:8080/images/restaurants/default.png";
              }}
            />
            <div className="restaurant-info">
              <h3>{r.name}</h3>
              <p>Cuisine: {r.cuisineType || "N/A"}</p>
              <p>Rating: {r.rating || "N/A"} ⭐</p>
              <p>ETA: {r.eta || "-"} mins</p>
              <p>Address: {r.address || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
