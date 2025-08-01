import { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// نمایش لیست تسک‌ها
const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between px-4 py-2 rounded-lg shadow-sm border transition-all duration-200 ${
            todo.completed
              ? "bg-gray-100 text-gray-500 line-through"
              : "bg-white hover:bg-blue-50"
          }`}
        >
          {/* کلیک روی متن برای تیک زدن */}
          <span
            onClick={() => onToggle(todo.id)}
            className={`cursor-pointer flex-1 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>

          {/* دکمه حذف */}
          <button
            onClick={() => onDelete(todo.id)}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
