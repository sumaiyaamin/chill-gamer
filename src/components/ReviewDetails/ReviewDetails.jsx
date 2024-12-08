import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaStar, FaGamepad, FaUser, FaEnvelope, FaBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ReviewDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    // Fetch review details
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`http://localhost:5000/reviews/${id}`); // Corrected URL
                if (!response.ok) throw new Error('Review not found');
                const data = await response.json();
                setReview(data);
                
                // Check if review is in user's watchlist
                if (user) {
                    const watchlistResponse = await fetch(
                        `http://localhost:5000/watchlist/check/${id}?userEmail=${user.email}` // Corrected URL
                    );
                    const watchlistData = await watchlistResponse.json();
                    setIsInWatchlist(watchlistData.isInWatchlist);
                }
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [id, user]);

    const handleAddToWatchlist = async () => {
        if (!user) {
            toast.error('Please login to add to watchlist');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/watchlist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reviewId: id,
                    userEmail: user.email,
                    userName: user.displayName,
                    gameTitle: review.title,
                    gameImage: review.image,
                    gameRating: review.rating,
                    gameGenre: review.genre
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add to watchlist');
            }
            
            setIsInWatchlist(true);
            toast.success('Added to your watchlist!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen pt-20 flex justify-center items-center ${
                isDark ? 'bg-[#1a1c2e] text-white' : 'bg-gray-50 text-gray-900'
            }`}>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen pt-20 flex flex-col items-center justify-center ${
                isDark ? 'bg-[#1a1c2e] text-white' : 'bg-gray-50 text-gray-900'
            }`}>
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-20 ${
            isDark ? 'bg-[#1a1c2e] text-white' : 'bg-gray-50 text-gray-900'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-lg overflow-hidden shadow-xl ${
                        isDark ? 'bg-gray-800' : 'bg-white'
                    }`}
                >
                    {/* Game Cover Image */}
                    <div className="relative h-96">
                        <img 
                            src={review.image} 
                            alt={review.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {review.title}
                            </h1>
                            <div className="flex items-center space-x-4">
                                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400">
                                    {review.genre}
                                </span>
                                <div className="flex items-center text-yellow-400">
                                    <FaStar className="mr-1" />
                                    <span>{review.rating}/5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Content */}
                    <div className="p-6 space-y-6">
                        {/* Reviewer Info */}
                        <div className={`flex items-center space-x-4 p-4 rounded-lg ${
                            isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                            <div className="flex items-center space-x-2">
                                <FaUser className="text-purple-500" />
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                    {review.reviewerName}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaEnvelope className="text-purple-500" />
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                    {review.userEmail}
                                </span>
                            </div>
                        </div>

                        {/* Review Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Review</h2>
                            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                {review.description}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={handleAddToWatchlist}
                                disabled={isInWatchlist}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                                    isInWatchlist
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
                                } text-white`}
                            >
                                <FaBookmark />
                                <span>
                                    {isInWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
                                </span>
                            </button>
                            
                            <div className="flex items-center space-x-2">
                                <FaGamepad className="text-purple-500" />
                                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                    Published: {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ReviewDetails;