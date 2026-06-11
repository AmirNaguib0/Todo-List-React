import { useMemo, useRef } from "react";
import useTask from "./hooks/useTask";
function App() {
  const [tasks, setTasks] = useTask();

  const reminingTasks = useMemo(
    () => tasks.filter((tasks) => !tasks.completed).length,
  );
  const inputRef = useRef();

  const handleAddTasks = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), name: text, completed: false },
    ]);
    inputRef.current.value = "";
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTasks();
    }
  };

  const handleTaskCompleted = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
            <div className="w-full flex gap-2">
              <input
                onKeyDown={handleOnKeyDown}
                ref={inputRef}
                className="flex-1 border-b-2 border-gray-300 py-2 px-3 focus:outline-none focus:border-gray-500"
                type="text"
                placeholder="Add a new task"
              />
              <button
                onClick={handleAddTasks}
                className="rounded-xl bg-gray-800 px-4 text-white transition hover:bg-gray-700 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-2xl border border-gray-200 bg-slate-50 p-4 flex items-center justify-between"
              >
                <div
                  className="flex items-center gap-3"
                  onClick={() => handleTaskCompleted(task.id)}
                >
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                  />
                  <span
                    className={`${task.completed ? "line-through" : ""} cursor-pointer select-none`}
                  >
                    {task.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-xs text-red-500 cursor-pointer hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-gray-100 p-4 text-gray-700">
            Remaining tasks: {reminingTasks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
