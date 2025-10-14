import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import "../css/Menu.css";
import { CartContext } from "../context/CartContext";
import Navbar from "./Navbar";

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialPage = parseInt(queryParams.get("page")) || 0;

  const [menu, setMenu] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const { addToCart, removeFromCart, getQuantity } = useContext(CartContext);

  // Fetch menu whenever restaurantId or page changes
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        // Fetch paginated menu
        const res = await api.get(
          `/menus/restaurant/${restaurantId}?page=${page}&size=${size}`
        );

        const content = res.data?.content || [];
        setMenu(content);
        setTotalPages(res.data?.totalPages || 0);

        // Fetch restaurant name
        const resRest = await api.get(`/restaurants/${restaurantId}`);
        setRestaurantName(resRest.data?.name || "");

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu.");
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId, page, size]);

  // Update URL when page changes
  const navigateToPage = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`, { replace: true });
  };

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) return <p style={{ paddingTop: "80px" }}>Loading...</p>;
  if (error) return <p style={{ paddingTop: "80px" }}>{error}</p>;

  return (
    <div className="menu-page">
      <Navbar />

      <h2>{restaurantName} - Menu</h2>

      <div className="menu-list">
        {menu.length > 0 ? (
          menu.map((item) => {
            const quantity = getQuantity(item.menuId);
            const imageUrl =
              item.imagePath && item.imagePath.trim() !== ""
                ? `http://localhost:8080/images/menu/${item.imagePath.trim()}`
                : "http://localhost:8080/images/menu/default.png";

            return (
              <div key={item.menuId} className="menu-card">
                <img
                  src={imageUrl}
                  alt={item.itemName}
                  className="menu-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "http://localhost:8080/images/menu/default.png";
                  }}
                />
                <div className="menu-info">
                  <h4>{item.itemName}</h4>
                  <p>{item.description || "No description"}</p>
                  <p>Price: ₹{item.price || "-"}</p>
                  <p>Rating: {item.rating || "-"} ⭐</p>
                </div>

                {quantity === 0 ? (
                  <button className="add-cart-btn" onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => removeFromCart(item)}>
                      -
                    </button>
                    <span className="qty-display">{quantity}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>
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
  );
};

export default Menu;
