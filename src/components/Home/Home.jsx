import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighestRated = async () => {
            try {
                const response = await fetch('http://localhost:5000/highest-rated-games');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHighestRated();
    }, []);

    if (loading) {
        return <div className="min-h-screen pt-20 flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen pt-20 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen">
            {/* Banner Section */}
            <section className="pt-20 pb-10 bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]">
                
            </section>

            {/* Highest Rated Games Section */}
            <section className="py-16 bg-gradient-to-b from-[#2a1c3f] to-[#1a1c2e]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Highest Rated Games
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {games.map((game) => (
                            <div key={game._id} 
                                className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                            >
                                <img 
                                    src={game.image} 
                                    alt={game.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {game.title}
                                    </h3>
                                    <div className="flex items-center mb-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-gray-300">{game.rating}/5</span>
                                    </div>
                                    <p className="text-gray-400 mb-2">{game.genre}</p>
                                    <p className="text-gray-400 mb-4 line-clamp-2">
                                        {game.description}
                                    </p>
                                    <Link 
                                        to={`/game/${game._id}`}
                                        className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                                    >
                                        Explore Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
        </div>
    );
};

export default Home;