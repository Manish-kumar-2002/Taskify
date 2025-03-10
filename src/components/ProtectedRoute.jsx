import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("taskifyUser"));

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return element;
}
