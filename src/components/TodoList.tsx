import { AnimatePresence } from "framer-motion";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  editingText: string;
  setEditingText: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
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
            onToggle={onToggle}
            onDelete={onDelete}
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
