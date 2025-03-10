import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import useLocalStorage from "../utils/useLocalStorage";
import useTaskNotifications from "../utils/useTaskNotifications";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = useAuth(); // Get logged-in user

  // Load Tasks from LocalStorage
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Filter only assigned tasks for the logged-in user
  const userTasks = tasks.filter(task => task.assignedTo === user?.name);

  // Call Notification Hook
  useTaskNotifications(userTasks);

  // Update Task Status
  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Taskify User</h2>
        <button
          onClick={() => {
            localStorage.removeItem("taskifyUser");
            navigate("/");
          }}
          className="bg-red-500 px-4 py-2 rounded mt-4 hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6">Welcome, {user?.name}!</h1>

        {/* Task List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Your Assigned Tasks</h2>
          {userTasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned yet.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Task</th>
                  <th className="border p-2">Priority</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userTasks.map(task => (
                  <tr key={task.id}>
                    <td className="border p-2">{task.title}</td>
                    <td className={`border p-2 ${task.priority === "High" ? "text-red-500" : "text-green-500"}`}>
                      {task.priority}
                    </td>
                    <td className={`border p-2 ${task.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                      {task.status}
                    </td>
                    <td className="border p-2">
                      {task.status === "Pending" && (
                        <button 
                          onClick={() => updateStatus(task.id, "Completed")} 
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
