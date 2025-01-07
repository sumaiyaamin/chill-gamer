import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number'),
    photoURL: yup.string().url('Invalid URL').required('Photo URL is required')
});

const Register = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const handleServerLogin = async (email) => {
        const response = await fetch('https://chill-gamer-server-v1.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Server login failed');
        }

        return response.json();
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            
            // First register with Firebase
            const userCredential = await registerUser(data.email, data.password, data.name, data.photoURL);
            
            // Prepare user data for server
            const userData = {
                name: data.name,
                email: data.email,
                photoURL: data.photoURL,
                uid: userCredential.user.uid,
                role: 'user',
                createdAt: new Date(),
                reviews: [],
                watchlist: [],
                lastLogin: new Date()
            };

            // Save user data to server
            const response = await fetch('https://chill-gamer-server-v1.vercel.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save user data');
            }

            // Also log the user in on the server
            await handleServerLogin(data.email);

            toast.success('Registration successful!');
            reset(); // Clear form
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col bg-gradient-to-b from-[#1a1c2e] to-[#2a1c3f]">
            <div className="max-w-md w-full mx-auto mt-8 bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Create Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <FaUser className="text-purple-500" />
                                    <span>Full Name</span>
                                </div>
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <FaEnvelope className="text-purple-500" />
                                    <span>Email</span>
                                </div>
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <FaLock className="text-purple-500" />
                                    <span>Password</span>
                                </div>
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Create a password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <FaImage className="text-purple-500" />
                                    <span>Profile Photo URL</span>
                                </div>
                            </label>
                            <input
                                {...register('photoURL')}
                                type="url"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter URL for your profile photo"
                            />
                            {errors.photoURL && (
                                <p className="mt-1 text-sm text-red-500">{errors.photoURL.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-400">
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                        >
                            Login here
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;