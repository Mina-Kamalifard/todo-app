import { motion } from "framer-motion";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
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
  // محاسبه رنگ بر اساس اختلاف ساعت
  const now = Date.now();
  const diffHours = (now - todo.createdAt) / (1000 * 60 * 60);

  let timeColor = "text-gray-500";

  if (!todo.completed) {
    if (diffHours >= 28) {
      timeColor = "text-red-600 font-bold";
    } else if (diffHours >= 24) {
      timeColor = "text-orange-500 font-semibold";
    }
  }

  // برای نمایش تاریخ و ساعت
  const todoDate = new Date(todo.createdAt);
  const formattedDate = todoDate.toLocaleDateString("fa-IR");
  const formattedTime = todoDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.li
      key={todo.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={`flex justify-between items-center border-b py-2 px-2 rounded-md ${
        todo.completed ? "bg-green-50" : ""
      }`}
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
          <div className="flex-1 cursor-pointer select-none" onClick={onToggle}>
            <div className={todo.completed ? "line-through text-gray-400" : ""}>
              {todo.text}
            </div>
            <div className={`text-xs ${timeColor}`}>
              {formattedDate} - {formattedTime}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button
              className="text-blue-500 text-sm"
              onClick={() => onStartEdit(todo.id, todo.text)}
            >
              ویرایش
            </button>
            <button className="text-red-500 text-sm" onClick={onDelete}>
              حذف
            </button>
          </div>
        </>
      )}
    </motion.li>
  );
};

export default TodoItem;
