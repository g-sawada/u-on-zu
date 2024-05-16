import React from 'react';
import { createRoot } from 'react-dom/client';

document.addEventListener('turbo:load', () => {
  const container = document.getElementById('create-graph-app');
  if (container) {
  createRoot(container).render(<Test />);
  } else {
  console.log('test_app not found');
  }
})