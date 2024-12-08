import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../components/Home/Home';
import AddReview from '../components/AddReview/AddReview';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ReviewDetails from '../components/ReviewDetails/ReviewDetails'; 
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AllReviews from '../AllReviews/AllReviews';
import MyReviews from '../components/MyReviews/MyReviews';
import UpdateReview from '../components/UpdateReview/UpdateReview';
import MyWatchlist from '../components/MyWatchlist/MyWatchlist';
import NotFound from '../components/NotFound/NotFound';

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
                path: '/reviews/:id', 
                element: <ReviewDetails /> 
            },
            {
                path: '/reviews',
                element: (
                    
                        <AllReviews />
                    
                )
            },
            {
                path: '/my-reviews',
                element: (
                    <ProtectedRoute>
                        <MyReviews/>
                    </ProtectedRoute>
                )
            },
            {
                path: '/update-review/:id',
                element: (
                    <ProtectedRoute>
                        <UpdateReview/>
                    </ProtectedRoute>
                )
            },
            {
                path: '/my-watchlist',
                element: (
                    <ProtectedRoute>
                        <MyWatchlist />
                    </ProtectedRoute>
                )
            },
            {
                path: '*',
                element: (
                    <NotFound />
                )
            },
        
        ]
    }
]);

export default router;