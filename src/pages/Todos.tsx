import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import { request } from "../lib/service";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Todos = () => {
  const { userId } = useContext(userContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (userId === -1) return;

    const getTodos = async () => {
      const data = await request(`todos?userId=${userId}`);
      setTodos(data);
    };

    getTodos();
  }, [userId]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Todos</h1>

      <div className="space-y-3">
        {todos.map((todo) => (
          <article
            key={todo.id}
            className="flex items-center gap-3 rounded-lg border bg-card p-4"
          >
            <input type="checkbox" checked={todo.completed} readOnly />

            <p
              className={
                todo.completed ? "text-muted-foreground line-through" : ""
              }
            >
              {todo.title}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Todos;
