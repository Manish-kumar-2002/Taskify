import { useEffect } from "react";

export default function useTaskNotifications(tasks) {
  useEffect(() => {
    // Check if Notifications are supported
    if (!("Notification" in window)) {
      console.log("Notifications not supported in this browser.");
      return;
    }

    // Request Notification Permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Function to Show Notifications
    const showNotification = (task) => {
      new Notification("Task Reminder", {
        body: `Your task "${task.title}" is still pending! 📌`,
        icon: "/taskify-icon.png", // Add an app icon if available
      });
    };

    // Check for Pending Tasks Every 30 Seconds
    const checkTasks = () => {
      const pendingTasks = tasks.filter(task => task.status === "Pending");
      pendingTasks.forEach(task => showNotification(task));
    };

    const interval = setInterval(checkTasks, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [tasks]);
}
