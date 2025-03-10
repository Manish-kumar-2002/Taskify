import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"

const users = [
  { email: "admin@taskify.com", password: "admin123", role: "admin" },
  { email: "user@taskify.com", password: "user123", role: "user" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("taskifyUser", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <img className="w-[60px] mx-auto my-0 mb-2" src={Logo} alt="logo" />
        <h2 className="text-2xl font-semibold text-center mb-4">Login to Taskify</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
