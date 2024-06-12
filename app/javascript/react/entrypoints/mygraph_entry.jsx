import React from 'react';
import { createRoot } from 'react-dom/client';
import MyGraphApp from '../mygraph';

document.addEventListener('turbo:load', () => {
  const container = document.getElementById('mygraph-app');
  if (container) {
    const graphId = container.getAttribute('data-id');
    createRoot(container).render(<MyGraphApp graphId={graphId}/>);
  } else {
  console.log('mygraph-app not found');
  }
})