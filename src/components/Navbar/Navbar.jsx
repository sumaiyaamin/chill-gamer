import { Link } from 'react-router-dom';
import { useState } from 'react';
import gameLogo from '../../assets/game-logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/all-reviews", label: "All Reviews" },
        { path: "/add-review", label: "Add Review" },
        { path: "/my-reviews", label: "My Reviews" },
        { path: "/watchlist", label: "Game WatchList" }
    ];

    return ( 
        <nav className="fixed w-full z-50 bg-gradient-to-r from-[#1a1c2e] to-[#2a1c3f] shadow-lg shadow-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 group">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="relative">
                                <img 
                                    src={gameLogo} 
                                    alt="Chill Gamer" 
                                    className="h-12 w-12 object-contain transform group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                            </div>
                            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                Chill Gamer
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.path}
                                    to={link.path} 
                                    className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="hidden md:block">
                        <Link 
                            to="/login"
                            className="relative inline-flex items-center px-6 py-2 overflow-hidden text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transform transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent rounded-md">
                                Login
                            </span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-600/20 focus:outline-none transition-all duration-300"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="relative">
                                {!isMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div 
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path}
                            to={link.path} 
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-md transition-all duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link 
                        to="/login" 
                        className="block px-3 py-2 mt-4 text-center text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:from-purple-500 hover:to-blue-400 transition-all duration-300"
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