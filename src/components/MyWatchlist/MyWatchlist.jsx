import { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyWatchlist = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Protect route
    if (!authLoading && !user) {
        return <Navigate to="/login" replace state={{ from: '/my-watchlist' }} />;
    }

    useEffect(() => {
        if (user) {
            fetchWatchlist();
        }
    }, [user]);

    const fetchWatchlist = async () => {
        try {
            const response = await fetch(`https://chill-gamer-server-v1.vercel.app/users/${user.email}/watchlist`);
            const watchlistItems = await response.json();

            if (response.ok) {
                // Fetch full review details for each watchlist item
                const reviewPromises = watchlistItems.map(item =>
                    fetch(`https://chill-gamer-server-v1.vercel.app/reviews/${item.reviewId}`).then(res => res.json())
                );

                const reviews = await Promise.all(reviewPromises);
                const combinedData = watchlistItems.map((item, index) => ({
                    ...item,
                    reviewDetails: reviews[index]
                }));

                setWatchlist(combinedData);
            } else {
                throw new Error('Failed to fetch watchlist');
            }
        } catch (err) {
            console.error('Error fetching watchlist:', err);
            toast.error('Failed to load your watchlist');
            setError('Failed to load your watchlist. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWatchlist = async (reviewId) => {
        try {
            const result = await Swal.fire({
                title: 'Remove from Watchlist?',
                text: "Are you sure you want to remove this game from your watchlist?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, remove it!'
            });

            if (result.isConfirmed) {
                const response = await fetch(`https://chill-gamer-server-v1.vercel.app/watchlist/${reviewId}?userEmail=${user.email}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setWatchlist(prev => prev.filter(item => item.reviewId !== reviewId));
                    toast.success('Game removed from watchlist');
                } else {
                    throw new Error('Failed to remove from watchlist');
                }
            }
        } catch (err) {
            console.error('Error removing from watchlist:', err);
            toast.error('Failed to remove from watchlist');
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
                    My Watchlist
                </h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {watchlist.length === 0 ? (
                    <div className="text-center text-gray-300">
                        <p className="text-xl mb-4">Your watchlist is empty.</p>
                        <Link
                            to="/reviews"
                            className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            Browse Reviews
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-gray-700/50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Game</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Rating</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Platform</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Added On</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                {watchlist.map((item) => (
                                    <tr key={item.reviewId} className="hover:bg-gray-700/30">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={item.reviewDetails.image}
                                                    alt={item.reviewDetails.title}
                                                    className="h-10 w-10 rounded-lg object-cover mr-3"
                                                    onError={(e) => {
                                                        e.target.src = 'https://placehold.co/100x100?text=Game';
                                                    }}
                                                />
                                                <div>
                                                    <div className="font-medium text-white">
                                                        {item.reviewDetails.title}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {item.reviewDetails.genre}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-purple-500 text-white text-sm rounded-full">
                                                ★ {item.reviewDetails.rating}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {item.reviewDetails.platform}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {new Date(item.addedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button
                                                onClick={() => navigate(`/reviews/${item.reviewId}`)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => handleRemoveFromWatchlist(item.reviewId)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Remove
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

export default MyWatchlist;