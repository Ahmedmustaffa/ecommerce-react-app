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
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const currentUser = localStorage.getItem("currentUser");

      setIsLoggedIn(Boolean(token || user || currentUser));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="grid w-full grid-cols-3 items-center gap-4">
        <div className="flex items-center justify-start">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-medium text-gray-700 transition hover:text-cyan-700 dark:text-gray-200 dark:hover:text-cyan-400"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 transition hover:text-cyan-700 dark:text-gray-200 dark:hover:text-cyan-400"
            >
              Login
            </Link>
          )}
        </div>

        <div className="hidden items-center justify-center gap-8 md:flex">
          <NavbarLink as={Link} to="/product">
            Product
          </NavbarLink>
          <NavbarLink as={Link} to="/cart">
            Cart
          </NavbarLink>
          <NavbarLink as={Link} to="/favorite">
            Favorite
          </NavbarLink>
        </div>

        <div className="flex items-center justify-end gap-3">
          <NavbarBrand as="div">
            <div
              aria-label="Company logo"
              className="flex h-10 w-10 items-center justify-center  text-base font-black tracking-tight text-white shadow-md"
            >
              AM3
            </div>
          </NavbarBrand>

          <div className="md:hidden">
            <NavbarToggle />
          </div>
        </div>
      </div>

      <NavbarCollapse className="md:hidden">
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
    </Navbar>
  );
}
