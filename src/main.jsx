import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Layout/Main.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import RegisterRBS from './components/RegisterRBS/RegisterRBS.jsx';
import RegisterBS from './RegisterBS/RegisterBS.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>

      },
      {
        path: '/login',
        element: <Login></Login>

      },

      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/register-rbs',
        element: <RegisterRBS></RegisterRBS>
      },
      {
        path: '/register-bs',
        element: <RegisterBS></RegisterBS>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
