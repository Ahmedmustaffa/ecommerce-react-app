import { Link } from "react-router-dom";
import EmptyState from "./emptyState";
import { useEffect, useState } from "react";

export default function Shipping() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("");

  async function loadCart() {
    const response = await fetch("/api/cart");
    const data = await response.json();
    setCart(data.cart);
    if (!data.success) setMessage(data.message);
  }

  useEffect(() => {
    loadCart();
  }, []);

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

  return (
    <div className="container py-5">
      <div className="veera-card p-4 mx-auto" style={{ maxWidth: 760 }}>
        <h1 className="h3 fw-black mb-3">Shipping Details</h1>
        <p className="mb-3">
          Thank you for your order. This is a static shipping page where you can
          display your shipping information and next steps.
        </p>
        <ul className="list-group mb-4">
          <li className="list-group-item">Order status: pending</li>
          <li className="list-group-item">
            Delivery method: standard shipping
          </li>
          <li className="list-group-item">
            Estimated delivery: 3-5 business days
          </li>
        </ul>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-veera" to="/cart">
            Back to Cart
          </Link>
          <Link className="btn btn-veera" to="/">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
