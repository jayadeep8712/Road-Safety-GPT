import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import ReportPage from './components/ReportPage.jsx';  
import Intro from './components/Intro.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,  
  },
  {
    path: "/app",
    element: <App />,  
  },
  {
    path: "/report",
    element: <ReportPage />,  
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);