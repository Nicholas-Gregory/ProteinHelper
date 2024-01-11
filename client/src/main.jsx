import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import 'normalize.css'
import './style.css'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Browse from './layouts/Browse.jsx'
import Create from './layouts/Create.jsx'
import BrowseFoods from './pages/BrowseFoods.jsx'
import BrowseCreations from './pages/BrowseCreations.jsx'
import MyCreations from './pages/MyCreations.jsx'
import NewCreation from './pages/NewCreation.jsx'
import UserProvider, { LOCAL_STORAGE_KEY } from './contexts/UserContext'
import Auth from './layouts/Auth'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import { apiCall } from './utils/http'
import Food from './pages/Food'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/browse',
        element: <Browse />,
        children: [
          {
            path: '/browse/foods',
            element: <BrowseFoods />,
            children: [
              {
                path: '/browse/foods/:id',
                element: <Food />,
                loader: ({ params }) => apiCall('GET', `/food/${params.id}`, null, localStorage.getItem(LOCAL_STORAGE_KEY))
              }
            ]
          },
          {
            path: '/browse/creations',
            element: <BrowseCreations />
          }
        ]
      },
      {
        path: '/create',
        element: <Create />,
        children: [
          {
            path: '/create/my',
            element: <MyCreations />,
            loader: () => apiCall('GET', '/creation/user/')
          },
          {
            path: '/create/new',
            element: <NewCreation />
          }
        ]
      },
      {
        path: '/auth',
        element: <Auth />,
        children: [
          {
            path: '/auth/signup',
            element: <CreateAccount />
          },
          {
            path: '/auth/login',
            element: <Login />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
