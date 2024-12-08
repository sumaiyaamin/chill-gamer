import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar, FaSort, FaFilter } from 'react-icons/fa';
import { useTheme } from '../components/contexts/ThemeContext';

const AllReviews = () => {
    const { isDark } = useTheme();
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [selectedGenre, setSelectedGenre] = useState('all');

    // Get unique genres from reviews
    const genres = ['all', ...new Set(reviews.map(review => review.genre))];

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        // Apply filtering and sorting whenever reviews, sortOption, or selectedGenre changes
        let result = [...reviews];

        // Apply genre filter
        if (selectedGenre !== 'all') {
            result = result.filter(review => review.genre === selectedGenre);
        }

        // Apply sorting
        switch (sortOption) {
            case 'highest-rated':
                result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case 'lowest-rated':
                result.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'year-desc':
                result.sort((a, b) => parseInt(b.releaseYear) - parseInt(a.releaseYear));
                break;
            case 'year-asc':
                result.sort((a, b) => parseInt(a.releaseYear) - parseInt(b.releaseYear));
                break;
            default:
                break;
        }

        setFilteredReviews(result);
    }, [reviews, sortOption, selectedGenre]);

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/reviews');
            const data = await response.json();

            if (response.ok) {
                setReviews(data);
                setFilteredReviews(data);
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

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    All Game Reviews
                </h1>

                {/* Filter and Sort Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    {/* Genre Filter */}
                    <div className="w-full md:w-auto">
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer w-full md:w-48"
                            >
                                {genres.map(genre => (
                                    <option key={genre} value={genre}>
                                        {genre === 'all' ? 'All Genres' : genre}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="w-full md:w-auto">
                        <div className="relative">
                            <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer w-full md:w-48"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="highest-rated">Highest Rated</option>
                                <option value="lowest-rated">Lowest Rated</option>
                                <option value="year-desc">Release Year (Newest)</option>
                                <option value="year-asc">Release Year (Oldest)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {filteredReviews.length === 0 ? (
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
                        {filteredReviews.map((review) => (
                            <div 
                                key={review._id}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative group">
                                    <img 
                                        src={review.image} 
                                        alt={review.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/600x400?text=Game+Image';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-white text-sm line-clamp-2">
                                                {review.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-bold text-white">
                                            {review.title}
                                        </h2>
                                        <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                                            ★ {review.rating}
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <p className="text-gray-300">
                                            <span className="font-semibold">Genre:</span> {review.genre}
                                        </p>
                                        <p className="text-gray-300">
                                            <span className="font-semibold">Platform:</span> {review.platform}
                                        </p>
                                        <p className="text-gray-300">
                                            <span className="font-semibold">Year:</span> {review.releaseYear}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-purple-400 font-bold">
                                            ${review.price || 'N/A'}
                                        </span>
                                        <Link 
                                            to={`/reviews/${review._id}`}
                                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                                        >
                                            View Details
                                        </Link>
                                    </div>
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