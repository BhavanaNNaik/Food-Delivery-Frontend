import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon
import "../css/Navbar.css";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar-menu">
      <div className="logo-menu">FoodieExpress</div>
      <div className="nav-right">
        {/* Modern Cart Icon */}
        <Link to="/cart" className="cart-wrapper">
          <FaShoppingCart className="cart-icon" />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>

        {/* Logout button */}
        <button className="logout-btn-menu">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
