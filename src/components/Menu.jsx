import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Menu.css";

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/menus/restaurant/${restaurantId}`);
        setMenu(res.data);

        // Fetch restaurant name
        const resRest = await api.get(`/restaurants/${restaurantId}`);
        setRestaurantName(resRest.data.name);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu.");
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) return <p style={{ paddingTop: "80px" }}>Loading...</p>;
  if (error) return <p style={{ paddingTop: "80px" }}>{error}</p>;

  return (
    <div className="menu-page">
      {/* Navbar */}
      <nav className="navbar-menu">
        <div className="logo-menu">FoodieExpress</div>
        <button className="logout-btn-menu" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Page Title */}
      <h2>{restaurantName} - Menu</h2>

      {/* Menu Items */}
      <div className="menu-list">
        {menu.length > 0 ? (
          menu.map((item) => (
            <div key={item.menuId} className="menu-card">
              <img
                src={
                  item.imagePath && item.imagePath.trim() !== ""
                    ? `http://localhost:8080/images/menu/${item.imagePath.trim()}`
                    : "http://localhost:8080/images/menu/default.png"
                }
                alt={item.itemName}
                className="menu-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "http://localhost:8080/images/menu/default.png";
                }}
              />
              <div className="menu-info">
                <h4>{item.itemName}</h4>
                <p>{item.description}</p>
                <p>Price: ₹{item.price}</p>
                <p>Rating: {item.rating || "-"} ⭐</p>
              </div>
              <button className="add-cart-btn">Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
