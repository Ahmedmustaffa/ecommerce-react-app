import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../API/ProductApi";

const API_URL = import.meta.env.VITE_API_URL || "";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setMessage("");
        const res = await getProductById(id);
        setProduct(res.data);
      } catch {
        setMessage("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });
      const data = await response.json();

      setMessage(response.ok ? "Product added to cart." : data.message || "Unable to add product to cart.");
    } catch {
      setMessage("Unable to connect to the server.");
    }
  };

  if (loading) {
    return <p className="px-4 py-8 text-center font-bold text-gray-900 dark:text-white">Loading product...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl mt-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-10">
        Product Details
      </h1>

      {message && (
        <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-center text-indigo-700">
          {message}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
        <div className="md:w-1/2 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700">
          {product?.image ? (
            <img
              src={product.image}
              alt={product?.name || "Product Image"}
              className="max-h-96 w-full object-contain rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-64 w-full flex items-center justify-center text-gray-400 dark:text-gray-200 font-medium">
              No Image Available
            </div>
          )}
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800">
              Category: {product?.category || "Uncategorized"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {product?.name}
          </h2>

          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-6">
            ${product?.price}
          </div>

          <div className="text-gray-600 dark:text-gray-200 mb-8 leading-relaxed">
            <p>
              {product?.desc || "No description available for this product."}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex gap-4 flex-wrap">
            <Link
              to="/product"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back To Products
            </Link>
            <button
              type="button"
              onClick={addToCart}
              className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
