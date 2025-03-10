import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";
import Logo from "../assets/logo.png";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Load Tasks from LocalStorage
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Users List (Static for now, later we can fetch dynamically)
  const users = ["John Doe", "Alice Smith", "Bob Johnson"];

  // New Task State
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: users[0],
    priority: "Medium",
    status: "Pending",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Handle Task Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim() === "") return;

    setTasks([...tasks, { id: Date.now(), ...newTask }]);
    setNewTask({
      title: "",
      assignedTo: users[0],
      priority: "Medium",
      status: "Pending",
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <Link className="flex items-center gap-2 mb-4" to="/">
          <img className="w-[40px]" src={Logo} alt="logo" />
          <span className="text-white font-medium text-2xl">Taskify</span>
        </Link>
        <div className="flex justify-between flex-col ">
          <h2 className="text-2xl font-bold mb-5">Good Morning Admin</h2>
          <button
            onClick={() => {
              localStorage.removeItem("taskifyUser");
              navigate("/");
            }}
            className="bg-red-500 px-4 py-2 rounded mt-4 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Task Assign Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full border p-2 rounded"
              required
            />

            <select
              name="assignedTo"
              value={newTask.assignedTo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>

            <select
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Assign Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-bold mb-4">All Assigned Tasks</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Task</th>
                <th className="border p-2">Assigned To</th>
                <th className="border p-2">Priority</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.assignedTo}</td>
                  <td
                    className={`border p-2 ${
                      task.priority === "High"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td
                    className={`border p-2 ${
                      task.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
