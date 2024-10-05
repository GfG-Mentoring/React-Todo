import { createContext, useState } from 'react';

export const TodoContext = createContext<any>([]);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  console.log(children);

  const [todos, setTodos] = useState([]);

  const updateParticularTodo = (particularTodo: {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  }) => {
    const todoToUpdate = todos.findIndex(
      (todo: any) => todo.id === particularTodo.id
    );
    if (todoToUpdate < 0) console.warn('No todo to update.');

    const newTodos = todos.map((todo: any) => {
      if (todo.id === particularTodo.id) {
        return particularTodo;
      } else return todo;
    });

    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={[todos, setTodos, updateParticularTodo]}>
      {children}
    </TodoContext.Provider>
  );
};
