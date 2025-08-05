// src/App.tsx
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodoStore } from "./store/todoStore";

const App = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const { todos, loadFromLocalStorage } = useTodoStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    })
    .sort((a, b) => {
      // اول انجام نشده ها (completed: false) قبل انجام شده ها (completed: true)
      if (a.completed === b.completed) {
        // اگر وضعیت برابر بود، مرتب کن بر اساس createdAt (مثلاً جدیدترین اول)
        return b.createdAt - a.createdAt;
      }
      return a.completed ? 1 : -1; // اگر a انجام شده است، بعد b قرار می‌گیره (یعنی پایین‌تر)
    });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📝 My Todo List
      </h1>

      <TodoForm />

      {/* فیلتر */}
      <div className="flex justify-center gap-4 mb-4">
        {["all", "completed", "incomplete"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`px-3 py-1 rounded-md ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {f === "all"
              ? "همه"
              : f === "completed"
              ? "انجام‌شده"
              : "در حال انجام"}
          </button>
        ))}
      </div>

      <TodoList
        todos={filteredTodos}
        editingId={editingId}
        setEditingId={setEditingId}
        editingText={editingText}
        setEditingText={setEditingText}
        onSaveEdit={() => {
          useTodoStore.getState().editTodo(editingId!, editingText);
          setEditingId(null);
          setEditingText("");
        }}
        onCancelEdit={() => {
          setEditingId(null);
          setEditingText("");
        }}
      />
    </div>
  );
};

export default App;
