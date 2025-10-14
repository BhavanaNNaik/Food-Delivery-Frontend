import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Restaurant.css";
import Navbar from "./Navbar";

const Restaurants = () => {
  const navigate = useNavigate();

  const initialPage = parseInt(new URLSearchParams(window.location.search).get("page")) || 0;
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [size] = useState(6); // Number of restaurants per page
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch restaurants whenever page, size, or searchTerm changes
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/restaurants?page=${page}&size=${size}&search=${encodeURIComponent(searchTerm)}`);
        let data = res.data?.content || [];
        setTotalPages(res.data?.totalPages || 0);

        // Frontend search filtering
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
  }, [page, searchTerm, size]);

  // Navigate to a new page and update URL
  const navigateToPage = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`, { replace: true });
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
                    e.target.src = "http://localhost:8080/images/restaurants/default.png";
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => navigateToPage(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => navigateToPage(page + 1)}
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
