import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.menuId === item.menuId);
      if (exists) {
        return prev.map((i) =>
          i.menuId === item.menuId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.menuId === item.menuId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const getQuantity = (menuId) => {
    const found = cart.find((i) => i.menuId === menuId);
    return found ? found.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
