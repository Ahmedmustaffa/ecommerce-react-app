import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { getAllProduct } from "../API/ProductApi";
import { Nav } from "../components/Navbar";

const FAVORITES_KEY = "favoriteProducts";

const getStoredFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
};

export default function Favorite() {
  const [products, setProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setFavoriteIds(getStoredFavorites());

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAllProduct();
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch {
        setError("Unable to load favorite products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const favoriteProducts = useMemo(() => {
    return products.filter((product) =>
      favoriteIds.includes(String(product._id))
    );
  }, [products, favoriteIds]);

  const removeFavorite = (productId) => {
    const nextFavorites = favoriteIds.filter((id) => id !== String(productId));

    setFavoriteIds(nextFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
  };

  const getShortDescription = (description = "") => {
    if (description.length <= 110) {
      return description;
    }

    return `${description.slice(0, 110)}...`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Nav />

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Favorite Products
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Products you saved for later.
            </p>
          </div>

          <Link
            to="/product"
            className="inline-flex items-center justify-center rounded-lg border border-cyan-700 px-4 py-2.5 text-sm font-medium text-cyan-700 transition hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-100 dark:border-cyan-500 dark:text-cyan-300 dark:hover:bg-gray-800 dark:focus:ring-cyan-900"
          >
            Browse Products
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-lg bg-white shadow dark:bg-gray-800"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && favoriteProducts.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No favorites yet
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Add products to your favorites from the products page.
            </p>
          </div>
        )}

        {!loading && !error && favoriteProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteProducts.map((product) => (
              <Card
                key={product._id}
                className="h-full overflow-hidden"
                imgAlt={product.name}
                imgSrc={product.image}
              >
                <div className="flex h-full flex-col">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
                    {product.category}
                  </span>

                  <h3 className="line-clamp-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {getShortDescription(product.desc)}
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${Number(product.price).toFixed(2)}
                    </span>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-cyan-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeFavorite(product._id)}
                        className="inline-flex items-center justify-center rounded-lg border border-rose-600 bg-white px-4 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100 dark:border-rose-800 dark:bg-gray-800 dark:text-rose-300 dark:hover:bg-gray-700 dark:focus:ring-rose-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
