import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import { Nav } from "../components/Navbar.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function Shipping() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("");

  async function loadCart() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();

      if (response.ok) {
        setCart(data.cart || data.data);
        setMessage("");
      } else {
        setCart(null);
        setMessage(data.message || "Unable to load cart.");
      }
    } catch {
      setCart(null);
      setMessage("Unable to connect to the server.");
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  if (message && !cart) {
    const title = message.toLowerCase().includes("cart") ? "The Cart is Empty." : "Log in first";
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Nav />
        <div className="mx-auto w-full max-w-4xl px-4 py-12">
          <EmptyState title={title} text={message} />
        </div>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Nav />
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 h-8 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="h-96 animate-pulse rounded-lg bg-white shadow-sm dark:bg-gray-800" />
            <div className="h-72 animate-pulse rounded-lg bg-white shadow-sm dark:bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!cart.products?.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Nav />
        <div className="mx-auto w-full max-w-4xl px-4 py-12">
          <EmptyState
            title="The Cart is Empty."
            text="Add the required products and then complete the order."
          />
        </div>
      </div>
    );
  }

  const total = cart.products.reduce((sum, item) => {
    const product = item.productId || {};
    const price = Number(product.price) || 0;

    return sum + price * item.quantity;
  }, 0);

  const itemCount = cart.products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Nav />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
            Checkout
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Shipping Details
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Confirm your order summary and delivery information.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Delivery Status
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Pending", "Standard shipping", "3-5 business days"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Items Ready for Shipping
              </h2>

              <div className="mt-5 divide-y divide-gray-200 dark:divide-gray-700">
                {cart.products.map((item) => {
                  const product = item.productId || {};
                  const price = Number(product.price) || 0;
                  const productId = product._id || item.productId;

                  return (
                    <div
                      key={productId}
                      className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900 dark:text-white">
                          {product.name || "Product"}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          Qty {item.quantity} x {price.toFixed(2)} EGP
                        </p>
                      </div>
                      <p className="shrink-0 font-bold text-gray-900 dark:text-white">
                        {(price * item.quantity).toFixed(2)} EGP
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 border-b border-gray-200 pb-5 text-sm dark:border-gray-700">
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span>Status</span>
                <span>Pending</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
                {total.toFixed(2)} EGP
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                className="inline-flex w-full items-center justify-center rounded-lg border border-cyan-700 px-5 py-3 text-sm font-medium text-cyan-700 transition hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-100 dark:border-cyan-500 dark:text-cyan-300 dark:hover:bg-gray-700 dark:focus:ring-cyan-900"
                to="/cart"
              >
                Back to Cart
              </Link>
              <Link
                className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                to="/"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
