import React, { useState, useEffect } from "react";
import { Check, Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("chaliyam_tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return [];
      }
    }
    return [];
  });
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("chaliyam_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 relative">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mb-8">
        <h1 className="font-yatra text-4xl text-gray-900 mb-2">My Tasks</h1>
        <p className="text-gray-500">
          Manage your personal tasks and reminders. Stored securely on your device.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden mb-8">
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-black/5">
          <form onSubmit={addTask} className="relative">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full pl-4 pr-12 py-4 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm placeholder:text-slate-400 font-medium"
            />
            <button
              type="submit"
              disabled={!newTaskText.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
            >
              <Plus size={20} />
            </button>
          </form>
        </div>

        <div className="p-4 sm:p-6">
          {tasks.length > 0 && (
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Your Tasks
              </span>
              <span className="text-xs font-medium text-slate-400">
                {completedCount} / {tasks.length} completed
              </span>
            </div>
          )}

          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {sortedTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  layout
                  className={`group relative flex items-start gap-3 p-4 rounded-xl transition-all ${
                    task.completed
                      ? "bg-slate-50 border border-slate-100"
                      : "bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 shrink-0 transition-colors ${
                      task.completed ? "text-indigo-500" : "text-slate-300 hover:text-indigo-400"
                    }`}
                  >
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  
                  <span
                    className={`flex-1 text-sm sm:text-base transition-colors duration-200 ${
                      task.completed ? "text-slate-400 line-through" : "text-slate-700"
                    }`}
                  >
                    {task.text}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all focus:opacity-100"
                    aria-label="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {tasks.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">All caught up</h3>
                <p className="text-sm text-slate-500">
                  You don't have any tasks yet. Add one above!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
