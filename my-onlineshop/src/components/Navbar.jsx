import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="navbar">
      <h2 onClick={() => nav("/")}>E-Shop</h2>

      <div className="nav-right">
        {user ? (
          <>
            <span className="username">👤 {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => nav("/login")}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;