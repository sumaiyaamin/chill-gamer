import { Link } from 'react-router-dom';
import { useState } from 'react';
import gameLogo from '../../assets/game-logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed w-full z-50 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img 
                                src={gameLogo} 
                                alt="Chill Gamer" 
                                className="h-12 w-12 object-contain"
                            />
                            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                                Chill Gamer
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                                Home
                            </Link>
                            <Link to="/all-reviews" className="text-gray-300 hover:text-white transition-colors duration-300">
                                All Reviews
                            </Link>
                            <Link to="/add-review" className="text-gray-300 hover:text-white transition-colors duration-300">
                                Add Review
                            </Link>
                            <Link to="/my-reviews" className="text-gray-300 hover:text-white transition-colors duration-300">
                                My Reviews
                            </Link>
                            <Link to="/watchlist" className="text-gray-300 hover:text-white transition-colors duration-300">
                                Game WatchList
                            </Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="hidden md:block">
                        <Link 
                            to="/login"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link 
                        to="/" 
                        className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/all-reviews" 
                        className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        All Reviews
                    </Link>
                    <Link 
                        to="/add-review" 
                        className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Add Review
                    </Link>
                    <Link 
                        to="/my-reviews" 
                        className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        My Reviews
                    </Link>
                    <Link 
                        to="/watchlist" 
                        className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Game WatchList
                    </Link>
                    <Link 
                        to="/login" 
                        className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;