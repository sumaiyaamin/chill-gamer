import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Protect route
    if (!authLoading && !user) {
        return <Navigate to="/login" replace state={{ from: '/my-reviews' }} />;
    }

    useEffect(() => {
        if (user) {
            fetchUserReviews();
        }
    }, [user]);

    const fetchUserReviews = async () => {
        try {
            const response = await fetch(`https://chill-gamer-server-v1.vercel.app/users/${user.email}/reviews`);
            const data = await response.json();

            if (response.ok) {
                setReviews(data);
            } else {
                throw new Error(data.message || 'Failed to fetch reviews');
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            toast.error('Failed to load your reviews');
            setError('Failed to load your reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reviewId) => {
      try {
          const result = await Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!'
          });
  
          if (result.isConfirmed) {
              const response = await fetch(`https://chill-gamer-server-v1.vercel.app/reviews/${reviewId}?userEmail=${user.email}`, {
                  method: 'DELETE'
              });
  
              const data = await response.json();
  
              if (response.ok) {
                  setReviews(reviews.filter(review => review._id !== reviewId));
                  toast.success('Review deleted successfully!', {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: isDark ? "dark" : "light",
                  });
              } else {
                  throw new Error(data.message || 'Failed to delete review');
              }
          }
      } catch (err) {
          console.error('Error deleting review:', err);
          toast.error(err.message || 'Failed to delete review', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: isDark ? "dark" : "light",
          });
      }
  };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white text-center mb-12">
                    My Reviews
                </h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {reviews.length === 0 ? (
                    <div className="text-center text-gray-300">
                        <p className="text-xl mb-4">You haven't added any reviews yet.</p>
                        <button
                            onClick={() => navigate('/add-review')}
                            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            Add Your First Review
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-gray-700/50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Game</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Rating</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Platform</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Date Added</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                {reviews.map((review) => (
                                    <tr key={review._id} className="hover:bg-gray-700/30">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={review.image}
                                                    alt={review.title}
                                                    className="h-10 w-10 rounded-lg object-cover mr-3"
                                                    onError={(e) => {
                                                        e.target.src = 'https://placehold.co/100x100?text=Game';
                                                    }}
                                                />
                                                <div>
                                                    <div className="font-medium text-white">{review.title}</div>
                                                    <div className="text-sm text-gray-400">{review.genre}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
                                                ★ {review.rating}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {review.platform}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button
                                                onClick={() => navigate(`/update-review/${review._id}`)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;