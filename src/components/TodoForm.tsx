import { useState } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

// فرم برای اضافه کردن تسک جدید
const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState(""); // state برای مقدار ورودی کاربر

  // وقتی فرم ارسال بشه
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    if (!text.trim()) return; // اگه متن خالی باشه کاری نکن
    onAdd(text); // تابع ارسال تسک به App
    setText(""); // پاک کردن فیلد ورودی
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="What do you need to do?"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
