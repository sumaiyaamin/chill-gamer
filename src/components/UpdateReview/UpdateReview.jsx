import { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const UpdateReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        image: '',
        genre: '',
        platform: '',
        releaseYear: new Date().getFullYear(),
        rating: '',
        description: '',
        publisher: '',
        price: '',
        reviewText: '',
        reviewerName: '',
        userEmail: ''
    });

    const genres = [
        "Action", "Adventure", "RPG", "Strategy", 
        "Sports", "Simulation", "FPS", "Racing", 
        "Fighting", "Horror", "Puzzle", "Platform"
    ];

    const platforms = [
        "PC", "PlayStation 5", "PlayStation 4", 
        "Xbox Series X/S", "Xbox One", "Nintendo Switch", 
        "Mobile", "Multiple Platforms"
    ];

    // Protect route
    if (!authLoading && !user) {
        return <Navigate to="/login" replace state={{ from: `/update-review/${id} `}} />;
    }

    useEffect(() => {
        if (user && id) {
            fetchReviewData();
        }
    }, [user, id]);

    const fetchReviewData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/reviews/${id}`);
            const data = await response.json();

            if (response.ok) {
                // Verify ownership
                if (data.userEmail !== user.email) {
                    toast.error("You don't have permission to edit this review");
                    navigate('/my-reviews');
                    return;
                }

                setFormData({
                    title: data.title,
                    image: data.image,
                    genre: data.genre,
                    platform: data.platform,
                    releaseYear: data.releaseYear,
                    rating: data.rating,
                    description: data.description,
                    publisher: data.publisher,
                    price: data.price || '',
                    reviewText: data.review,
                    reviewerName: data.reviewerName,
                    userEmail: data.userEmail
                });
            } else {
                throw new Error(data.message || 'Failed to fetch review');
            }
        } catch (err) {
            console.error('Error fetching review:', err);
            toast.error('Failed to load review data');
            setError('Failed to load review data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/reviews/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.title,
                    image: formData.image,
                    genre: formData.genre,
                    platform: formData.platform,
                    rating: parseFloat(formData.rating),
                    releaseYear: parseInt(formData.releaseYear),
                    publisher: formData.publisher,
                    price: formData.price ? parseFloat(formData.price) : 0,
                    description: formData.description,
                    review: formData.reviewText,
                    reviewerName: formData.reviewerName,
                    userEmail: formData.userEmail
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Review updated successfully');
                navigate('/my-reviews');
            } else {
                throw new Error(data.message || 'Failed to update review');
            }
        } catch (err) {
            console.error('Error updating review:', err);
            toast.error('Failed to update review');
            setError('Failed to update review. Please try again.');
        } finally {
            setLoading(false);
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Update Review</h2>
                    
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* User Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    User Email
                                </label>
                                <input 
                                    type="email" 
                                    value={formData.userEmail}
                                    disabled
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/30 border border-gray-600 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Reviewer Name
                                </label>
                                <input 
                                    type="text" 
                                    name="reviewerName"
                                    value={formData.reviewerName}
                                    disabled
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/30 border border-gray-600 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Game Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Game Title *
                                </label>
                                <input 
                                    type="text" 
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Game Cover Image URL *
                                </label>
                                <input 
                                    type="url" 
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Game Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Genre *
                                </label>
                                <select 
                                    name="genre"
                                    required
                                    value={formData.genre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                >
                                    <option value="">Select Genre</option>
                                    {genres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Platform *
                                </label>
                                <select 
                                    name="platform"
                                    required
                                    value={formData.platform}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                >
                                    <option value="">Select Platform</option>
                                    {platforms.map(platform => (
                                        <option key={platform} value={platform}>{platform}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Rating *
                                </label>
                                <select 
                                    name="rating"
                                    required
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                >
                                    <option value="">Select Rating</option>
                                    {[5, 4, 3, 2, 1].map(num => (
                                        <option key={num} value={num}>{num} Stars</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Release Year *
                                </label>
                                <input 
                                    type="number" 
                                    name="releaseYear"
                                    required
                                    min="1970"
                                    max={new Date().getFullYear()}
                                    value={formData.releaseYear}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Publisher *
                                </label>
                                <input 
                                    type="text" 
                                    name="publisher"
                                    required
                                    value={formData.publisher}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Price (USD)
                                </label>
                                <input 
                                    type="number" 
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Game Description *
                            </label>
                            <textarea 
                                name="description"
                                required
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        {/* Review Text */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Your Review *
                            </label>
                            <textarea 
                                name="reviewText"
                                required
                                rows={4}
                                value={formData.reviewText}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/my-reviews')}
                                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 transition-all duration-300"
                            >
                                {loading ? 'Updating...' : 'Update Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateReview;