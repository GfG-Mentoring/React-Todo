import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { TodoProvider } from './providers/TodoContext.tsx';
import AnotherApp from './AnotherApp.tsx';
import Login from './Login.tsx';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TodoProvider>
        <App />
      </TodoProvider>
    </Provider>
  </StrictMode>
);
