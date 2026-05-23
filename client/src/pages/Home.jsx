import { Link, Navigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { Nav } from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  // 1. Check for authentication tokens in localStorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const currentUser = localStorage.getItem("currentUser");
  const isLoggedIn = Boolean(token || user || currentUser);

  // 2. If the user is already logged in, redirect to /product immediately
  if (isLoggedIn) {
    return <Navigate to="/product" replace />;
  }

  // 3. Otherwise, render the standard Home page for guests
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Nav />

      <section className="flex min-h-[calc(100vh-74px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Welcome to Our Store
          </h1>

          <p className="mt-4 text-base text-gray-600 dark:text-gray-300 sm:text-lg">
            Sign in to explore your shopping experience.
          </p>

          <div className="mt-8 flex justify-center">
            <Button as={Link} to="/login" color="cyan" size="lg">
              Login
            </Button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
