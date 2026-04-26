import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    addToCart,
    addToWishlist,
    wishlist = []
  } = useContext(CartContext) || {};

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://674e84f1635bad45618eebc1.mockapi.io/api/v1/zeptoproducts/${id}`
      )
      .then((res) => {
        setProduct(res.data);

        axios
          .get(
            "https://674e84f1635bad45618eebc1.mockapi.io/api/v1/zeptoproducts"
          )
          .then((r) => {
            const sameCategory = r.data.filter(
              (p) =>
                p.category === res.data.category &&
                p.id !== res.data.id
            );
            setRelated(sameCategory);
          });
      });
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  // ❤️ wishlist check
  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  // ❤️ toggle wishlist (IMPORTANT FIX)
  const handleWishlist = () => {
    if (isWishlisted) {
      // remove logic handled in context
      addToWishlist(product); // toggle function (remove if exists)
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-page">

      {/* LEFT SIDE */}
      <div className="product-left">
        <img src={product.image} alt={product.title} />
      </div>

      {/* RIGHT SIDE */}
      <div className="product-right">

        {/* TITLE FIX */}
        <h1>{product.title || product.name}</h1>

        <h2 className="price">₹{product.price}</h2>

        <p className="category">
          Category: {product.category}
        </p>

        <p className="desc">
          High quality product with best price and fast delivery.
        </p>

        <div className="delivery">
          🚚 Delivery in 2-5 days
        </div>

        {/* 🛒 ADD TO CART */}
        <button
          className="add-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>

        {/* ❤️ WISHLIST TOGGLE */}
        <button
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          {isWishlisted
            ? "❤️ Remove from Wishlist"
            : "🤍 Add to Wishlist"}
        </button>

      </div>

      {/* RELATED PRODUCTS */}
      <div className="related-section">
        <h3>Related Products</h3>

        <div className="grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;