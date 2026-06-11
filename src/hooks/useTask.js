import { useState, useEffect } from "react";

export default function usePTask() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return [];
    const parsed = JSON.parse(storedTasks);
    // Ensure all tasks have unique IDs
    return parsed.map((task, index) => ({
      ...task,
      id: task.id || Date.now() + index,
    }));
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return [tasks, setTasks];
}
