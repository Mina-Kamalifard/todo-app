// src/store/todoStore.ts
import { create } from "zustand";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStore {
  todos: Todo[];
  editingId: number | null;
  editingText: string;
  setEditingText: (text: string) => void;
  startEditing: (id: number, text: string) => void;
  cancelEditing: () => void;
  saveEditing: () => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  setTodos: (todos: Todo[]) => void;
  loadFromLocalStorage: () => void;
}

const LOCAL_STORAGE_KEY = "my_todo_list";

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  editingId: null,
  editingText: "",
  setEditingText: (text) => set({ editingText: text }),

  startEditing: (id, text) => {
    set({ editingId: id, editingText: text });
  },

  cancelEditing: () => {
    set({ editingId: null, editingText: "" });
  },

  saveEditing: () => {
    const { editingId, editingText, editTodo } = get();
    if (editingId !== null) {
      editTodo(editingId, editingText);
      set({ editingId: null, editingText: "" });
    }
  },

  setTodos: (todos) => {
    set({ todos });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  },
  addTodo: (text) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    console.log("Adding todo with text:", text);
    const updated = [...get().todos, newTodo];
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },
  toggleTodo: (id) => {
    const updated = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },
  deleteTodo: (id) => {
    const updated = get().todos.filter((todo) => todo.id !== id);
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },
  editTodo: (id, text) => {
    const updated = get().todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    set({ todos: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },
  loadFromLocalStorage: () => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const parsed: Todo[] = JSON.parse(data);
        set({ todos: parsed });
      }
    } catch (e) {
      console.error("Error loading from localStorage:", e);
    }
  },
}));
