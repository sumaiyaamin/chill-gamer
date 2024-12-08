import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-[#1a1c2e]">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-8 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <FaGamepad className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-purple-500" />
                </div>
                <p className="mt-4 text-gray-400 animate-pulse">Loading awesome games</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;