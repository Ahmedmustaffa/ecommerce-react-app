import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import { Nav } from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("");
  const [removingId, setRemovingId] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  async function loadCart() {
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: getAuthHeaders(),
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

  async function updateQuantity(productId, quantity) {
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();

      if (response.ok) {
        setCart(data.cart || data.data);
        setMessage("");
      } else {
        setMessage(data.message || "Unable to update quantity.");
      }
    } catch {
      setMessage("Unable to connect to the server.");
    }
  }

  async function removeItem(productId) {
    setRemovingId(productId);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (response.ok) {
        setCart(data.cart || data.data);
      } else {
        setMessage(data.message || "Unable to remove item.");
      }
    } catch {
      setMessage("Unable to connect to the server.");
    } finally {
      setRemovingId("");
    }
  }

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
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-36 animate-pulse rounded-lg bg-white shadow-sm dark:bg-gray-800"
                />
              ))}
            </div>
            <div className="h-64 animate-pulse rounded-lg bg-white shadow-sm dark:bg-gray-800" />
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

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Review your products before continuing to shipping.
            </p>
          </div>

          <Link
            to="/product"
            className="inline-flex items-center justify-center rounded-lg border border-cyan-700 px-4 py-2.5 text-sm font-medium text-cyan-700 transition hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-100 dark:border-cyan-500 dark:text-cyan-300 dark:hover:bg-gray-800 dark:focus:ring-cyan-900"
          >
            Continue Shopping
          </Link>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm font-medium text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-200">
            {message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="space-y-4">
            {cart.products.map((item) => {
              const product = item.productId || {};
              const productId = product._id || item.productId;
              const price = Number(product.price) || 0;

              return (
                <article
                  key={productId}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="grid gap-4 p-4 sm:grid-cols-[128px_1fr] sm:p-5">
                    <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name || "Product"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-400">
                          No Image
                        </span>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col gap-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
                            {product.category || "Product"}
                          </p>
                          <h2 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {product.name || "Product"}
                          </h2>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {price.toFixed(2)} EGP each
                          </p>
                        </div>

                        <button
                          className="inline-flex items-center justify-center rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-gray-700"
                          type="button"
                          onClick={() => removeItem(productId)}
                          disabled={removingId === productId}
                        >
                          {removingId === productId ? "Removing..." : "Remove"}
                        </button>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex w-fit items-center overflow-hidden rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900">
                          <button
                            className="h-10 w-10 text-lg font-semibold text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                            type="button"
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
                            className="h-10 w-14 border-x border-gray-300 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none dark:border-gray-600 dark:text-white"
                            value={item.quantity}
                            readOnly
                          />

                          <button
                            className="h-10 w-10 text-lg font-semibold text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                            type="button"
                            onClick={() => updateQuantity(productId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {(price * item.quantity).toFixed(2)} EGP
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
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
                <span>Shipping</span>
                <span>Calculated next</span>
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

            <Link
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-cyan-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              to="/shipping"
            >
              Continue to Shipping
            </Link>
          </aside>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
