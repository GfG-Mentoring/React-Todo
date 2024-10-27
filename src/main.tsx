import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { TodoProvider } from './providers/TodoContext.tsx';
import App from './App.tsx';
import { AuthProvider } from './providers/AuthContent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </AuthProvider>
  </StrictMode>
);
