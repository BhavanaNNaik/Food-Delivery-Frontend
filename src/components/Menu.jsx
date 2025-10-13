import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Menu.css";
import {CartContext} from "../context/CartContext";
import Navbar from "./Navbar";

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const {addToCart, removeFromCart, getQuantity}=useContext(CartContext);

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
      <Navbar />

      {/* Page Title */}
      <h2>{restaurantName} - Menu</h2>

      {/* Menu Items */}
      <div className="menu-list">
        {menu.length > 0 ? (
          menu.map((item) => { 
            const quantity=getQuantity(item.menuId);
            return (
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


              {quantity === 0 ? (
                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <span className="qty-display">{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
