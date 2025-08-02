import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

const LOCAL_STORAGE_KEY = "my_todo_list";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  // بارگذاری تسک‌ها از localStorage
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
    }
  }, []);

  // ذخیره تسک‌ها در localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  // اضافه کردن تسک جدید
  const handleAddTodo = (text: string) => {
    const now = new Date();
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      date: now.toLocaleDateString("fa-IR"),
      time: now.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // تغییر وضعیت انجام شده / نشده
  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // حذف تسک
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // شروع ویرایش
  const handleStartEdit = (id: number, currentText: string) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  // ذخیره ویرایش
  const handleSaveEdit = () => {
    if (editingId === null) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // لغو ویرایش
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // فیلتر کردن تسک‌ها بر اساس حالت
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📝 My Todo List
      </h1>

      <TodoForm onAdd={handleAddTodo} />

      {/* دکمه‌های فیلتر */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          همه
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-md ${
            filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          انجام‌شده
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`px-3 py-1 rounded-md ${
            filter === "incomplete" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          در حال انجام
        </button>
      </div>

      {/* لیست تسک‌ها با ارسال پراپ‌های ویرایش و انیمیشن */}
      <TodoList
        todos={[...filteredTodos].sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        )}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        editingId={editingId}
        setEditingId={setEditingId}
        editingText={editingText}
        setEditingText={setEditingText}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

export default App;
