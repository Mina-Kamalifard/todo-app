import { Todo } from "../types/todo"; // یا مسیر صحیح فایل نوع‌ها
import { AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";
import { useTodoStore } from "../store/todoStore";
interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  editingText: string;
  setEditingText: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos, // از پراپ استفاده کن
  editingId,
  setEditingId,
  editingText,
  setEditingText,
  onSaveEdit,
  onCancelEdit,
}) => {
  const handleStartEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => useTodoStore.getState().toggleTodo(todo.id)}
            onDelete={() => useTodoStore.getState().deleteTodo(todo.id)}
            onStartEdit={handleStartEdit}
            isEditing={editingId === todo.id}
            editingText={editingText}
            setEditingText={setEditingText}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;
