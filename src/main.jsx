import React from 'react'
import ReactDOM from 'react-dom/client'
import FilterStock from './FilterStock'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterStock />,
  },
  {
    path: "/filter-stock",
    element: <FilterStock />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
