import './styles/Index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { HomePage } from './pages/HomePage'
import { SearchResultsPage } from './pages/SearchResultsPage.tsx'
import { DetailsPage } from './pages/DetailsPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/search",
        element: <SearchResultsPage />
      },
      { 
        path: "/details/:pokemon",
        element: <DetailsPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)