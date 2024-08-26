import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import TodoApp from './TodoApp';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <TodoApp />
  </StrictMode>
);
