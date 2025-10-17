import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";
import api from "../services/api";
import "../css/Cart.css";

const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const cartItems = location.state?.cartItems || [];

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Step 1: Create Order object
      const orderData = {
        user: { userId: 1 }, // replace with actual logged-in user id
        restaurant: { restaurantId: cartItems[0].restaurantId },
        totalAmount: totalPrice,
        status: "Pending",
        paymentMode: "COD",
      };

      const orderRes = await api.post("/orders", orderData);
      const orderId = orderRes.data.orderId;

      // Step 2: Save each order item
      for (const item of cartItems) {
        const orderItemData = {
          order: { orderId },
          menu: { menuId: item.menuId },
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        };
        await api.post("/orderItems", orderItemData);
      }

      alert("Order placed successfully!");
      clearCart();
      navigate("/dashboard");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-page">
      <Navbar />
      <h2>Order Summary</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
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
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          <h3 className="grand-total">Grand Total: ₹{totalPrice}</h3>
          <button className="checkout-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
