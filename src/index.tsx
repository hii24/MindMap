import React from 'react';
import ReactDOM from 'react-dom/client';
import MindMap from './MindMap';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MindMap />
  </React.StrictMode>
);

