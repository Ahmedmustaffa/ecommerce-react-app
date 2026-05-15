import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState.jsx";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("");
  const [removingId, setRemovingId] = useState("");

  async function loadCart() {
    const response = await fetch("/api/cart");
    // obj من السيرفر ويحوله الي response بياخد
    const data = await response.json();
    setCart(data.cart);
    if (!data.success) setMessage(data.message);
  }

  useEffect(() => {
    loadCart();
  }, []);

  // Update quantity function
  async function updateQuantity(productId, quantity) {
    const response = await fetch("/api/cart", {
      method: "PUT",
      // json بعرف السيرفر اني ببعت
      headers: { "Content-Type": "application/json" },
      // ويبعتها json بيحول البيانات لـ
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();
    if (!data.success) setMessage(data.message);
    loadCart();
  }

  // Remove item function
  async function removeItem(productId) {
    setRemovingId(productId);
    setMessage("");
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      } else {
        setMessage(data.message);
      }
    } finally {
      setRemovingId("");
    }
  }

  if (message && !cart)
    return <EmptyState title="Log in first" text={message} />;
  if (!cart) return <p className="fw-bold">Loading Cart...</p>;
  if (!cart.products?.length)
    return (
      <EmptyState
        title="The Cart is Empty."
        text="Add the required products and then complete the order."
      />
    );

  // total price
  const total = cart.products.reduce((sum, item) => {
    const product = item.productId || {};
    const price = Number(product.price) || 0;

    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="row g-4">
      {message && (
        <div className="col-12">
          <div className="alert alert-info fw-bold mb-0">{message}</div>
        </div>
      )}

      <div className="col-lg-8">
        {cart.products.map((item) => {
          const product = item.productId || {};
          const productId = product._id || item.productId;
          const price = Number(product.price) || 0;

          return (
            <div className="veera-card p-3 mb-3" key={productId}>
              <div className="d-flex gap-3">

                {/* Product Content */}
                <div className="flex-grow-1">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div>
                      <h2 className="h5 fw-black mb-1">
                        {product.name || "Product"}
                      </h2>
                    </div>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => removeItem(productId)}
                      disabled={removingId === productId}
                    >
                      {removingId === productId ? "Removing..." : "Remove"}
                    </button>
                  </div>

                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="input-group" style={{ maxWidth: 220 }}>
                      <button
                        className="btn btn-outline-veera"
                        onClick={() =>
                          updateQuantity(
                            productId,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                      >
                        -
                      </button>

                      <input
                        className="form-control text-center"
                        value={item.quantity}
                        readOnly
                      />

                      <button
                        className="btn btn-outline-veera"
                        onClick={() => updateQuantity(productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="fw-bold fs-5 text-primary-veera">
                      {price.finalPrice * item.quantity} EGP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="col-lg-4">
        <div className="veera-card p-4 sticky-top" style={{ top: 90 }}>
          <h2 className="h4 fw-black">Order Summary</h2>

          <p className="fs-4 fw-black text-primary-veera">{total} EGP</p>

          <Link className="btn btn-veera w-100" to="/shipping">
            Continue to Shipping
          </Link>
        </div>
      </div>
    </div>
  );
}
