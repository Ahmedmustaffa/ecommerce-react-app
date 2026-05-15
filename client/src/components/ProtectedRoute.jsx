import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if the user is logged in (same logic as your Navbar)
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const currentUser = localStorage.getItem("currentUser");
  const isLoggedIn = Boolean(token || user || currentUser);

  // If not logged in, redirect them to the home page ("/")
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If they are logged in, render the protected component
  return children;
}
