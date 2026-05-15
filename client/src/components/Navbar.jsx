import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      // Your exact original auth logic
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const currentUser = localStorage.getItem("currentUser");
      
      // Attempt to get username for display
      const storedUsername = localStorage.getItem("username");

      if (token || user || currentUser) {
        setIsLoggedIn(true);
        
        // Extract username for the top right corner
        if (storedUsername) {
          setUsername(storedUsername);
        } else if (user) {
          try {
            const parsed = JSON.parse(user);
            setUsername(parsed.userName || parsed.username || "User");
          } catch {
            setUsername("User");
          }
        } else {
          setUsername("User");
        }
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    // Your exact original logout logic
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      
      <NavbarBrand as={Link} to="/">
        <div
          aria-label="Company logo"
          className="flex h-10 w-20 items-center justify-center bg-cyan-700 text-base font-black tracking-tight text-white shadow-md rounded"
        >
          ReactStore
        </div>
      </NavbarBrand>

      <div className="flex md:order-2 items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Hi, {username}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-medium text-rose-600 transition hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            Login
          </Link>
        )}
        
        {isLoggedIn && <NavbarToggle />}
      </div>

      {/* 3. CENTER: Navigation Links (Hidden if not logged in) */}
      {isLoggedIn && (
        <NavbarCollapse>
          <NavbarLink as={Link} to="/product" className="dark:text-gray-200">
            Product
          </NavbarLink>
          <NavbarLink as={Link} to="/cart" className="dark:text-gray-200">
            Cart
          </NavbarLink>
          <NavbarLink as={Link} to="/shipping" className="dark:text-gray-200">
            Shipping
          </NavbarLink>
          <NavbarLink as={Link} to="/favorite" className="dark:text-gray-200">
            Favorite
          </NavbarLink>
        </NavbarCollapse>
      )}
      
    </Navbar>
  );
}
