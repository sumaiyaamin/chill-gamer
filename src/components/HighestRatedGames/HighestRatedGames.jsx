import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaGamepad, FaCalendar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HighestRatedGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighestRated = async () => {
            try {
                const response = await fetch('https://chill-gamer-server-v1.vercel.app/highest-rated-games');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                setGames(data);
                setError(null);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to load games. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchHighestRated();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-24 h-24">
                        <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
                        <FaGamepad className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-purple-500" />
                    </div>
                    <p className="text-gray-400 animate-pulse">Loading awesome games...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex justify-center items-center">
                <div className="text-center p-8 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Highest Rated Games
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover the most acclaimed games that have captured players' hearts and minds
                    </p>
                </motion.div>
                
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {games.map((game) => (
                        <motion.div
                            key={game._id}
                            variants={item}
                            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={game.image} 
                                    alt={game.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-purple-500/80 backdrop-blur-sm rounded-lg text-white text-sm">
                                        {game.genre}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    {game.title}
                                </h3>
                                
                                <div className="flex items-center space-x-4 mb-3">
                                    <div className="flex items-center text-yellow-400">
                                        <FaStar className="mr-1" />
                                        <span>{game.rating}/5</span>
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                        <FaCalendar className="mr-1" />
                                        <span>{game.releaseYear}</span>
                                    </div>
                                </div>

                                <p className="text-gray-400 mb-4 line-clamp-2">
                                    {game.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">
                                        {game.platform}
                                    </span>
                                    <Link 
                                        to={`/game/${game._id}`}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                    >
                                        Explore Details
                                        <svg 
                                            className="w-4 h-4 ml-2 -mr-1" 
                                            fill="none" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {games.length === 0 && !loading && !error && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No games found. Be the first to add a review!</p>
                        <Link 
                            to="/add-review"
                            className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Add Review
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HighestRatedGames;