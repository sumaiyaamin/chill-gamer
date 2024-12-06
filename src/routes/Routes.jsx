import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../components/Home/Home'
import AddReview from '../components/AddReview/AddReview'


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
  
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
              path: '/add-review',
              element: <AddReview />
          },
           
        ]
    }
])

export default router