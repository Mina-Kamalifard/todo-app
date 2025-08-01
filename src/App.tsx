import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

const LOCAL_STORAGE_KEY = "my_todo_list";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    console.log("useEffect mount: loading todos");
    try {
      const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log("Loaded todos from localStorage:", savedTodos);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    console.log("todos changed:", todos);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📝 My Todo List
      </h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList
        todos={[...todos].sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        )}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
};

export default App;
