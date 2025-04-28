"use client";

import { useTodos } from "@/app/hooks/useTodos";

export default function TodoList() {
  const { todos, isLoading, error, toggleTodo, deleteTodo } = useTodos();

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to fetch todos"}
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  toggleTodo({ id: todo.id, completed: !todo.completed })
                }
                className="w-4 h-4"
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
