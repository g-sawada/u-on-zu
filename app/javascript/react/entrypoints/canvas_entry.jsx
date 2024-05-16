import React from 'react';
import { createRoot } from 'react-dom/client';
import CanvasApp from '../canvas';

document.addEventListener('turbo:load', () => {
  const container = document.getElementById('canvas-app');
  if (container) {
  createRoot(container).render(<CanvasApp />);
  } else {
  console.log('canvas-app not found');
  }
})