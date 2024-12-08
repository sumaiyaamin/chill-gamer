import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AddReview = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
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
        userEmail: '',
    });

    // Redirect if not logged in
    if (!authLoading && !user) {
        return <Navigate to="/login" replace state={{ from: '/add-review' }} />;
    }

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

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                userEmail: user.email,
                reviewerName: user.displayName || 'Anonymous User'
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); 
    };

    const validateForm = () => {
        if (!formData.title.trim()) return "Game title is required";
        if (!formData.image.trim()) return "Game cover image URL is required";
        if (!formData.genre) return "Please select a genre";
        if (!formData.platform) return "Please select a platform";
        if (!formData.rating) return "Please select a rating";
        if (!formData.description.trim()) return "Game description is required";
        if (!formData.publisher.trim()) return "Publisher name is required";
        if (!formData.reviewText.trim()) return "Review text is required";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setLoading(true);
        setError('');

        // Prepare the review data
        const reviewData = {
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
        };

        try {
            const response = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            const data = await response.json();
            
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your review has been added successfully',
                    icon: 'success',
                    confirmButtonText: 'View All Reviews',
                    showCancelButton: true,
                    cancelButtonText: 'Add Another Review'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/all-reviews');
                    } else {
                        // Reset form for new review
                        setFormData(prev => ({
                            ...prev,
                            title: '',
                            image: '',
                            genre: '',
                            platform: '',
                            releaseYear: new Date().getFullYear(),
                            rating: '',
                            description: '',
                            publisher: '',
                            price: '',
                            reviewText: ''
                        }));
                    }
                });
            } else {
                throw new Error(data.message || 'Failed to add review');
            }
        } catch (err) {
            console.error('Error adding review:', err);
            toast.error('Failed to add review. Please try again.');
            setError('Failed to add review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
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
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Add Game Review</h2>
                    
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
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-purple-500 transition-colors"
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
                                    placeholder="Enter game title"
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
                                    placeholder="Enter image URL"
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
                                    placeholder="Enter publisher name"
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
                                    placeholder="Enter price"
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
                                placeholder="Enter game description"
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
                                placeholder="Write your review here"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;