import { useContext } from 'react';
import { TodoContext } from '../providers/TodoContext';

interface TodoCardProps {
  todo: {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  };
}

export const TodoCard = (props: TodoCardProps) => {
  return (
    <div
      style={{
        border: '1px solid white',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'left',
        gap: '2rem',
        padding: '0.5rem',
      }}
    >
      <h2
        style={{
          textDecoration: props.todo.completed ? 'line-through' : 'none',
        }}
      >
        {props.todo.todo}
      </h2>
      <TodoUpdateElement todoId={props.todo.id} />
    </div>
  );
};

const TodoUpdateElement = (props: any) => {
  return <TodoUpdateGrandChild todoId={props.todoId} />;
};

const TodoUpdateGrandChild = (props: any) => {
  const [todos, , updateParticularTodo] = useContext(TodoContext);

  const todo = todos.find((todo: any) => todo.id === props.todoId);

  if (!todo) return <></>;

  return (
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={(e) =>
        updateParticularTodo({ ...todo, completed: !todo.completed })
      }
      style={{ width: '1rem' }}
    />
  );
};
