import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import gameConsoleAnimation from '../../assets/game-console-404.json';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const NotFound = () => {
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${
            isDark ? 'bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]' : 'bg-gradient-to-b from-gray-50 to-gray-100'
        }`}>
            <div className="text-center">
                {/* 404 Text with Animation Container */}
                <div className="relative">
                    <motion.h1 
                        className={`text-9xl font-bold mb-8 ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        4
                        <span className="relative inline-block">
                            <Lottie
                                animationData={gameConsoleAnimation}
                                className="w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            />
                            0
                        </span>
                        4
                    </motion.h1>
                </div>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className={`text-2xl font-bold mb-4 ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                        Game Over! Page Not Found
                    </h2>
                    <p className={`mb-8 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Looks like you've ventured into an unexplored territory!
                    </p>
                </motion.div>

                {/* Pixel Art Decorations */}
                <div className="flex justify-center space-x-4 mb-8">
                    {[...Array(3)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="w-4 h-4 bg-purple-500 rounded-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        />
                    ))}
                </div>

                {/* Return Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 group"
                    >
                        <span className="mr-2">🎮</span>
                        <span>Return to Home Base</span>
                        <svg 
                            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M13 5l7 7-7 7M5 5l7 7-7 7" 
                            />
                        </svg>
                    </Link>
                </motion.div>

                {/* Game Controls Decoration */}
                <div className="mt-12 flex justify-center space-x-8">
                    {['←', '↑', '↓', '→'].map((arrow, index) => (
                        <motion.div
                            key={arrow}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 ${
                                isDark 
                                    ? 'border-gray-700 text-gray-400' 
                                    : 'border-gray-300 text-gray-600'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            {arrow}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;