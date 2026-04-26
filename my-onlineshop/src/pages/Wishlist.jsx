import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist } = useContext(CartContext);

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">💖 My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h3>No items in wishlist 😔</h3>
          <p>Start adding your favorite products 💖</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((p) => (
            <div className="wishlist-card" key={p.id}>

              <img src={p.image} alt={p.title} />

              <div className="wishlist-info">
                <h4>{p.title}</h4>
                <p className="wishlist-price">₹{p.price}</p>
              </div>

              <button className="wishlist-btn">
                ❤️ Added
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;