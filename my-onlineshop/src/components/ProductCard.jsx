import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="card">

      {/* IMAGE */}
      <div
        className="card-img"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/150")
          }
        />
      </div>

      {/* INFO */}
      <div className="card-info">
        <h4 title={product.name}>
          {product.name}
        </h4>

        <p className="price">₹{product.price}</p>
      </div>

      {/* BUTTONS */}
      <div className="card-actions">
        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>
      </div>

    </div>
  );
};

export default ProductCard;