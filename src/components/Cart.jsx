import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/Cart.css";
import Navbar from "./Navbar";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    console.log("🛍️ Proceeding to checkout with cart:", cart);
    navigate("/orders", { state: { cartItems: cart } });
  };

  return (
    <div className="cart-page">
      <Navbar />
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.menuId} className="cart-item">
              <img
                src={
                  item.imagePath && item.imagePath.trim() !== ""
                    ? `http://localhost:8080/images/menu/${item.imagePath.trim()}`
                    : "http://localhost:8080/images/menu/default.png"
                }
                alt={item.itemName}
                className="cart-image"
              />
              <div className="cart-info">
                <h4>{item.itemName}</h4>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => removeFromCart(item)}>
                    -
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => addToCart(item)}>
                    +
                  </button>
                </div>
                <p>Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <h3 className="grand-total">Grand Total: ₹{totalPrice}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
