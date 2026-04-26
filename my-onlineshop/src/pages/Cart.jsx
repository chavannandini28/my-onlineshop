import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty 😔</h3>
        </div>
      ) : (
        <div className="cart-layout">

          {/* LEFT SIDE */}
          <div className="cart-left">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>

                {/* LEFT - IMAGE */}
                <img src={item.image} alt="" />

                {/* MIDDLE - QTY CONTROL */}
                <div className="cart-details">

                  <h4>{item.name}</h4>
                  <p className="price">₹{item.price}</p>

                  <div className="qty-control">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                </div>

                {/* RIGHT - REMOVE BUTTON */}
                <div className="cart-action">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove ❌
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="cart-right">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;