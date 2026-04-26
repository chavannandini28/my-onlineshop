import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Sidebar = () => {
  const nav = useNavigate();
  const { cart, wishlist } = useContext(CartContext);

  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <p onClick={() => nav("/")}>🏠 Home</p>
      <p onClick={() => nav("/dashboard")}>📊 Dashboard</p>
      <p onClick={() => nav("/users")}>👥 Users</p>

      <hr />

      {/* 🛒 CART */}
      <p onClick={() => nav("/cart")}>
        🛒 Cart <span className="badge">{cart.length}</span>
      </p>

      {/* ❤️ WISHLIST */}
      <p onClick={() => nav("/wishlist")}>
        ❤️ Wishlist <span className="badge">{wishlist.length}</span>
      </p>
    </div>
  );
};

export default Sidebar;