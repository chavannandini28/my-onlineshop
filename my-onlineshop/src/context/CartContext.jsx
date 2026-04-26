import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // =========================
  // ✅ LOAD FROM LOCALSTORAGE
  // =========================
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));

    if (savedCart) setCart(savedCart);
    if (savedWishlist) setWishlist(savedWishlist);
  }, []);

  // =========================
  // ✅ SAVE CART
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // ✅ SAVE WISHLIST
  // =========================
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // =========================
  // 🛒 CART FUNCTIONS
  // =========================

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================
  // ❤️ WISHLIST FUNCTIONS
  // =========================

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (!exist) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================
  // PROVIDER
  // =========================

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,

        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,

        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;