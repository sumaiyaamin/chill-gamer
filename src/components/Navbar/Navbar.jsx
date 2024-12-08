import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import gameLogo from '../../assets/game-logo.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isDark, setIsDark } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileOpen(false);
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Failed to logout');
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/reviews", label: "All Reviews" },
        ...(user ? [
            { path: "/add-review", label: "Add Review" },
            { path: "/my-reviews", label: "My Reviews" },
            { path: "/watchlist", label: "Game WatchList" }
        ] : [])
    ];

    const ThemeToggle = () => (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <svg 
                    className="w-6 h-6 text-yellow-400 hover:text-yellow-300 transition-colors duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                </svg>
            ) : (
                <svg 
                    className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                    />
                </svg>
            )}
        </button>
    );

    const AuthButtons = () => {
        if (user) {
            return (
                <div className="relative profile-dropdown">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-2 focus:outline-none"
                    >
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors duration-300 transform hover:scale-105">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out origin-top-right">
                            <div className="px-4 py-2 text-sm border-b dark:border-gray-700">
                                <p className="font-medium text-gray-900 dark:text-gray-200">
                                    {user.displayName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                Profile Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="flex items-center space-x-4">
                <Link 
                    to="/login"
                    className="relative inline-flex items-center px-4 py-2 overflow-hidden text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 hover:scale-105"
                >
                    <span className="relative">Login</span>
                </Link>
                <Link 
                    to="/register"
                    className="relative inline-flex items-center px-4 py-2 overflow-hidden text-purple-500 border border-purple-500 rounded-lg hover:text-white group hover:bg-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 hover:scale-105"
                >
                    <span className="relative">Register</span>
                </Link>
            </div>
        );
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/80 dark:bg-[#1a1c2e]/80 backdrop-blur-lg shadow-lg' 
                : 'bg-white dark:bg-[#1a1c2e]'
        }`}>
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
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.path}
                                    to={link.path} 
                                    className="relative text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300 group"
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <AuthButtons />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
                        >
                            <span className="sr-only">Open menu</span>
                            {!isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div 
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden bg-white dark:bg-gray-800`}
            >
                <div className="px-4 pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path}
                            to={link.path} 
                            className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    
                    {/* Mobile Auth Section */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {user ? (
                            <div className="px-3 py-2">
                                <div className="flex items-center space-x-3 mb-3">
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-10 h-10 rounded-full border-2 border-purple-500"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                                            {user.displayName}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <div className="px-3 space-y-2">
                                <Link
                                    to="/login"
                                    className="block w-full px-3 py-2 text-center text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:from-purple-500 hover:to-blue-400 transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full px-3 py-2 text-center text-purple-500 border border-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;