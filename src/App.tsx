import { useContext, useEffect, useState } from 'react';
import './App.css';
import { TodoCard } from './components/TodoCard';
import { TodoContext } from './providers/TodoContext';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { api } from './api';
import { removeAuth } from './store/authSlice';

function TodoPage() {
  const [newTodo, setTodo] = useState('');
  const [myTodos, setMyTodos] = useContext(TodoContext);

  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const fetchTodos = async () => {
    try {
      const data = await api.get('/todo');
      setMyTodos([
        ...(data?.data?.data?.map((todo) => ({
          todo: todo.title,
          completed: todo.completed,
          id: todo._id,
        })) ?? []),
      ]);
      setIsLoadingTodos(false);
    } catch (err) {
      console.error(err);
    }
  };

  console.log('hererere');
  useEffect(() => {
    fetchTodos();
  }, []);

  const addToMyTodos = () => {
    if (!newTodo) console.warn('Cannot create empty todos');

    setMyTodos([
      ...myTodos,
      {
        id: Math.random() * 10,
        todo: newTodo,
        completed: false,
        userId: 26,
      },
    ]);

    setTodo('');
  };

  const dispatch = useDispatch();

  if (isLoadingTodos) {
    return <div>Loading</div>;
  }

  return (
    <>
      <button
        onClick={() => {
          dispatch(removeAuth());
        }}
      >
        log out{' '}
      </button>
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          width: '60vw',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '2rem',
          display: 'flex',
          gap: '1rem',
        }}
      >
        <input
          value={newTodo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          style={{
            fontSize: '2rem',
          }}
        />
        <button onClick={addToMyTodos}>Save</button>
      </div>
      <div
        style={{
          marginTop: '8rem',
        }}
      >
        {myTodos.map((todo: any) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </div>
    </>
  );
}

export { TodoPage };

export default function App() {
  const authData = useSelector((state: any) => state.auth);

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${authData?.token}`;
  }, [authData]);

  return authData?.isLoggedIn ? <TodoPage /> : <Login />;
}
