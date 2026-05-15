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
      const token = localStorage.getItem("token");
      
      const storedUsername = localStorage.getItem("username");
      const storedUser = localStorage.getItem("user"); 

      if (token) {
        setIsLoggedIn(true);
        if (storedUsername) {
          setUsername(storedUsername);
        } else if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUsername(parsedUser.userName || "User");
          } catch {
            setUsername(storedUser);
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <Navbar className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      
      {/* 1. LEFT: Logo */}
      <NavbarBrand as={Link} to="/">
        <div
          aria-label="Company logo"
          className="flex h-10 px-3 items-center justify-center rounded bg-cyan-700 text-base font-black tracking-tight text-white shadow-md dark:bg-cyan-600"
        >
          ReactStore
        </div>
      </NavbarBrand>

      {/* 2. RIGHT: Auth & Mobile Toggle */}
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
        
        {/* Only show the mobile hamburger menu if the user is logged in */}
        {isLoggedIn && <NavbarToggle />}
      </div>

      {/* 3. CENTER: Navigation Links (Only rendered if logged in) */}
      {isLoggedIn && (
        <NavbarCollapse>
          <NavbarLink as={Link} to="/product">
            Product
          </NavbarLink>
          <NavbarLink as={Link} to="/cart">
            Cart
          </NavbarLink>
          <NavbarLink as={Link} to="/favorite">
            Favorite
          </NavbarLink>
        </NavbarCollapse>
      )}
      
    </Navbar>
  );
}
