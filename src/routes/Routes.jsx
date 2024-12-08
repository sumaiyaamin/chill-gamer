import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../components/Home/Home';
import AddReview from '../components/AddReview/AddReview';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ReviewDetails from '../components/ReviewDetails/ReviewDetails'; // Import the ReviewDetails component
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

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
                element: (
                    <ProtectedRoute>
                        <AddReview />
                    </ProtectedRoute>
                )
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/reviews/:id', // New route for review details
                element: <ReviewDetails /> // Component to display review details
            }
        ]
    }
]);

export default router;