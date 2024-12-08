import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaGamepad, FaChevronLeft, FaChevronRight, FaFire, FaClock, FaTrophy } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


const sliderData = [
  {
      id: 1,
      title: "Cyberpunk 2077",
      image: "https://i.ibb.co.com/C7b7sLm/cyberpunk-2077-wallpaper-and-title-1.jpg",
      genre: "Action RPG",
      rating: 4.5,
      platform: "PC, PS5, Xbox Series X",
      publisher: "CD Projekt Red",
      releaseYear: 2020,
      price: 59.99,
      description: "Experience the future in this open-world action-adventure RPG set in Night City."
  },
  {
      id: 2,
      title: "God of War Ragnarök",
      image: "https://i.ibb.co.com/Q6jVqm2/god-of-war-ragnarok-valhalla-cover.webp",
      genre: "Action-Adventure",
      rating: 5.0,
      platform: "PS5, PS4",
      publisher: "Sony",
      releaseYear: 2022,
      price: 69.99,
      description: "Embark on an epic journey through Norse realms with Kratos and Atreus."
  },
  {
      id: 3,
      title: "Elden Ring",
      image: "https://i.ibb.co.com/jWB4CN7/elden-rdx-IWs-F.webp",
      genre: "Action RPG",
      rating: 4.9,
      platform: "PC, PS5, Xbox Series X",
      publisher: "Bandai Namco",
      releaseYear: 2022,
      price: 59.99,
      description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring."
  }
];


const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
   


    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:5000/highest-rated-games');
                if (!response.ok) throw new Error('Failed to fetch games');
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);


    
    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-[#1a1c2e]">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-8 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <FaGamepad className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-purple-500" />
                </div>
                <p className="mt-4 text-gray-400 animate-pulse">Loading awesome games...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-[#1a1c2e]">
                <div className="text-center p-8 rounded-lg">
                    <FaGamepad className="text-6xl text-red-500 mx-auto mb-4" />
                    <p className="text-red-500 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1c2e]">
            {/* Hero Banner Section with Slider */}
            <section className="relative pt-20 bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f] overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 py-12 md:py-20"
                        >
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* Slider Info */}
                                <div className="text-white space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <FaGamepad className="text-purple-500 text-2xl" />
                                        <span className="text-purple-400 text-lg">
                                            {sliderData[currentSlide].genre}
                                        </span>
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-400" />
                                            <span className="ml-1">
                                                {sliderData[currentSlide].rating}/5
                                            </span>
                                        </div>
                                    </div>

                                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
                                        {sliderData[currentSlide].title}
                                    </h1>


<div className="flex flex-wrap gap-4 text-sm">
    <span className="px-3 py-1 bg-purple-500/20 rounded-full">
        {sliderData[currentSlide].platform}
    </span>
    <span className="px-3 py-1 bg-pink-500/20 rounded-full">
        {sliderData[currentSlide].publisher}
    </span>
    <span className="px-3 py-1 bg-blue-500/20 rounded-full">
        {sliderData[currentSlide].releaseYear}
    </span>
</div>

<p className="text-gray-300 line-clamp-3">
    {sliderData[currentSlide].description}
</p>

<div className="flex items-center gap-6">
    <Link 
        to={`/game/${sliderData[currentSlide].id}`}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
    >
        View Details
        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    </Link>
    <span className="text-2xl font-bold text-purple-400">
        ${sliderData[currentSlide].price}
    </span>
</div>
</div>

{/* Slider Image */}
<div className="relative group">
<div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
    <img 
        src={sliderData[currentSlide].image} 
        alt={sliderData[currentSlide].title}
        className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
</div>
</div>
</div>

{/* Slider Controls */}
<div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
<button 
onClick={prevSlide}
className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
>
<FaChevronLeft className="w-6 h-6" />
</button>
<button 
onClick={nextSlide}
className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
>
<FaChevronRight className="w-6 h-6" />
</button>
</div>

{/* Slider Indicators */}
<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
{sliderData.map((_, index) => (
<button
    key={index}
    onClick={() => setCurrentSlide(index)}
    className={`w-2 h-2 rounded-full transition-all duration-300 ${
        currentSlide === index 
            ? 'w-8 bg-purple-500' 
            : 'bg-gray-500/50'
    }`}
/>
))}
</div>
</motion.div>
</AnimatePresence>

{/* Background Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-[#1a1c2e] via-[#1a1c2e]/80 to-transparent" />
</div>
</section>

{/* Quick Stats Section */}
<section className="py-12 bg-gradient-to-b from-[#2a1c3f] to-[#1a1c2e]">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<motion.div 
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm"
>
<div className="flex items-center space-x-4">
<FaFire className="text-3xl text-orange-500" />
<div>
<h3 className="text-xl font-bold text-white">Popular Games</h3>
<p className="text-gray-400">Most reviewed titles</p>
</div>
</div>
</motion.div>

<motion.div 
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.2 }}
className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm"
>
<div className="flex items-center space-x-4">
<FaClock className="text-3xl text-blue-500" />
<div>
<h3 className="text-xl font-bold text-white">Latest Reviews</h3>
<p className="text-gray-400">Fresh perspectives</p>
</div>
</div>
</motion.div>

<motion.div 
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.4 }}
className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm"
>
<div className="flex items-center space-x-4">
<FaTrophy className="text-3xl text-yellow-500" />
<div>
<h3 className="text-xl font-bold text-white">Top Rated</h3>
<p className="text-gray-400">Community favorites</p>
</div>
</div>
</motion.div>
</div>
</div>
</section>

{/* Featured Games Grid */}
<section className="py-16 bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<motion.h2 
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
className="text-3xl font-bold text-center text-white mb-12"
>
Featured Games
</motion.h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{games.map((game, index) => (
<motion.div
key={game._id}
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}
className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
>
<div className="relative group">
<img 
    src={game.image} 
    alt={game.title}
    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white text-sm line-clamp-2">
            {game.description}
        </p>
    </div>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-2">
    <h3 className="text-xl font-semibold text-white">
        {game.title}
    </h3>
    <span className="px-2 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm">
        {game.genre}
    </span>
</div>
<div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
        <FaStar className="text-yellow-400 mr-1" />
        <span className="text-gray-300">{game.rating}/5</span>
    </div>
    <span className="text-gray-400">{game.platform}</span>
</div>
<div className="flex justify-between items-center">
    <span className="text-purple-400 font-bold">
        ${game.price}
    </span>
    <Link 
        to={`/game/${game._id}`}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
    >
        View Details
    </Link>
</div>
</div>
</motion.div>
))}
</div>
</div>
</section>

{/* Call to Action Section */}
<section className="py-20 bg-gradient-to-b from-[#2a1c3f] to-[#1a1c2e]">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<motion.div 
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
className="text-center"
>
<h2 className="text-4xl font-bold text-white mb-6">
Ready to Share Your Gaming Experience?
</h2>
<p className="text-gray-400 mb-8 max-w-2xl mx-auto">
Join our community of gamers and share your thoughts on your favorite games. 
Your reviews help others discover amazing gaming experiences.
</p>
<Link 
to="/add-review"
className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
>
Add Your Review
<FaGamepad className="ml-2" />
</Link>
</motion.div>
</div>
</section>
</div>
);
};

export default Home;
