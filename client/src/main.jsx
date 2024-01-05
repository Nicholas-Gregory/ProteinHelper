import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Browse from './layouts/Browse.jsx'
import Create from './layouts/Create.jsx'
import BrowseFoods from './pages/BrowseFoods.jsx'
import BrowseCreations from './pages/BrowseCreations.jsx'
import MyCreations from './pages/MyCreations.jsx'
import NewCreation from './pages/NewCreation.jsx'

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
            element: <BrowseFoods />
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
            element: <MyCreations />
          },
          {
            path: '/create/new',
            element: <NewCreation />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
