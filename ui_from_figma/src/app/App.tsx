import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import '../styles/fonts.css';
import '../styles/theme.css';

function App() {
  return (
    <div className="antialiased w-full min-h-screen text-[var(--color-ink)] bg-[var(--color-paper)]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
