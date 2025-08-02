import { motion } from "framer-motion";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStartEdit: (id: number, currentText: string) => void;
  isEditing: boolean;
  editingText: string;
  setEditingText: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onStartEdit,
  isEditing,
  editingText,
  setEditingText,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <motion.li
      key={todo.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={`flex justify-between items-center border-b py-2 ${
        todo.completed ? "bg-green-50" : ""
      } rounded-md px-2`}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveEdit();
          }}
          className="flex gap-2 items-center flex-1"
        >
          <input
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 flex-1"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            ذخیره
          </button>
          <button
            type="button"
            className="text-gray-500 text-sm"
            onClick={onCancelEdit}
          >
            لغو
          </button>
        </form>
      ) : (
        <>
          <div
            className="flex-1 cursor-pointer select-none"
            onClick={() => onToggle(todo.id)}
          >
            <div className={todo.completed ? "line-through text-gray-400" : ""}>
              {todo.text}
            </div>
            <div className="text-xs text-gray-500">
              {todo.date} - {todo.time}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button
              className="text-blue-500 text-sm"
              onClick={() => onStartEdit(todo.id, todo.text)}
            >
              ویرایش
            </button>
            <button
              className="text-red-500 text-sm"
              onClick={() => onDelete(todo.id)}
            >
              حذف
            </button>
          </div>
        </>
      )}
    </motion.li>
  );
};

export default TodoItem;
