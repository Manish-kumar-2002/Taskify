import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { 
    path: "/admin-dashboard", 
    element: <ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} /> 
  },
  { 
    path: "/user-dashboard", 
    element: <ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} /> 
  },
  { path: "*", element: <Login /> }  // 404 ke liye redirect to login
]);


function App() {
 

  return (
    <>
      <RouterProvider router={router} />;
    </>
  )
}

export default App
