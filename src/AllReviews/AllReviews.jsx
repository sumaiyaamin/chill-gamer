import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/reviews');
            const data = await response.json();

            if (response.ok) {
                setReviews(data);
            } else {
                throw new Error(data.message || 'Failed to fetch reviews');
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            toast.error('Failed to load reviews');
            setError('Failed to load reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
                    <button
                        onClick={fetchReviews}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white text-center mb-12">
                    All Game Reviews
                </h1>

                {reviews.length === 0 ? (
                    <div className="text-center text-gray-300">
                        <p className="text-xl">No reviews found.</p>
                        <Link 
                            to="/add-review"
                            className="inline-block mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Add First Review
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review) => (
                            <div 
                                key={review._id}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                            >
                                {/* Game Image */}
                                <img 
                                    src={review.image} 
                                    alt={review.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/600x400?text=Game+Image';
                                    }}
                                />

                                {/* Card Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-xl font-bold text-white">
                                            {review.title}
                                        </h2>
                                        <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                                            ★ {review.rating}
                                        </span>
                                    </div>

                                    {/* Game Details */}
                                    <div className="space-y-2 mb-4">
                                        <p className="text-gray-300">
                                            <span className="font-semibold">Genre:</span> {review.genre}
                                        </p>
                                        <p className="text-gray-300">
                                            <span className="font-semibold">Platform:</span> {review.platform}
                                        </p>
                                        <p className="text-gray-300">
                                            <span className="font-semibold">Publisher:</span> {review.publisher}
                                        </p>
                                    </div>

                                    {/* Description Preview */}
                                    <p className="text-gray-400 mb-6 line-clamp-2">
                                        {review.description}
                                    </p>

                                    {/* Review Info */}
                                    <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                                        <span>By {review.reviewerName || 'Anonymous'}</span>
                                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    {/* Action Button */}
                                    <Link 
                                        to={`/reviews/${review._id}`}
                                        className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors duration-300"
                                    >
                                        Explore Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllReviews;