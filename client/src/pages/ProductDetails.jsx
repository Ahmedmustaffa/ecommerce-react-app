import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../API/ProductApi";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl mt-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
        Product Details
      </h1>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        {/* Image Section */}
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
          {product?.image ? (
            <img
              src={product.image}
              alt={product?.name || "Product Image"}
              className="max-h-96 w-full object-contain rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-64 w-full flex items-center justify-center text-gray-400 font-medium">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold tracking-wider uppercase">
              {product?.category || "Category"}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product?.name}
          </h2>
          
          <div className="text-3xl font-extrabold text-indigo-600 mb-6">
            ${product?.price}
          </div>
          
          <div className="text-gray-600 mb-8 leading-relaxed">
            <p>
              {product?.desc || "No description available for this product."}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4 flex-wrap">
            <Link 
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back To Products
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto">
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
