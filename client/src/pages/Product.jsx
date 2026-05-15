import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Carousel } from "flowbite-react";
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

export default function Product() {
  const [products, setProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    const normalizedId = String(productId);

    setFavoriteIds((currentFavorites) => {
      const isFavorite = currentFavorites.includes(normalizedId);
      const nextFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== normalizedId)
        : [...currentFavorites, normalizedId];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
      return nextFavorites;
    });
  };

  const filteredProducts = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      const name = product?.name?.toLowerCase() || "";
      const category = product?.category?.toLowerCase() || "";

      return name.includes(value) || category.includes(value);
    });
  }, [products, searchTerm]);

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  const getShortDescription = (description = "") => {
    if (description.length <= 110) {
      return description;
    }

    return `${description.slice(0, 110)}...`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Nav />

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="h-64 overflow-hidden rounded-xl bg-gray-200 shadow-lg sm:h-80 lg:h-96">
          {featuredProducts.length > 0 ? (
            <Carousel slideInterval={3500} pauseOnHover>
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="relative h-full w-full bg-gray-900"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/25 to-transparent">
                    <div className="w-full p-5 text-white sm:p-8 lg:p-10">
                      <span className="mb-3 inline-block rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h1 className="max-w-3xl text-2xl font-bold sm:text-4xl lg:text-5xl">
                        {product.name}
                      </h1>
                      <p className="mt-3 max-w-2xl text-sm text-gray-100 sm:text-base">
                        {getShortDescription(product.desc)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-gray-500 dark:text-gray-300">
              {loading ? "Loading featured products..." : "No featured products available."}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Products
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Search by product name or category.
            </p>
          </div>

          <div className="w-full md:max-w-md">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products or categories..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-900"
            />
          </div>
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

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            No products match your search.
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
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
                        onClick={() => toggleFavorite(product._id)}
                        className={`inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-4 ${
                          favoriteIds.includes(String(product._id))
                            ? "border-rose-600 bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-200 dark:focus:ring-rose-900"
                            : "border-rose-200 bg-white text-rose-700 hover:bg-rose-50 focus:ring-rose-100 dark:border-rose-800 dark:bg-gray-800 dark:text-rose-300 dark:hover:bg-gray-700 dark:focus:ring-rose-900"
                        }`}
                      >
                        {favoriteIds.includes(String(product._id))
                          ? "Favorited"
                          : "Favorite"}
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
