import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
});

const Login = () => {
    const { login, googleSignIn } = useAuth();
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
            
            // Firebase authentication
            const userCredential = await login(data.email, data.password);
            
            // Server authentication
            await handleServerLogin(data.email);

            toast.success('Login successful!');
            reset(); // Clear form
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            
            // Google Sign In with Firebase
            const result = await googleSignIn();
            
            // Prepare user data for server
            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
                role: 'user',
                createdAt: new Date(),
                reviews: [],
                watchlist: [],
                lastLogin: new Date()
            };

            // First try to create/update user in database
            const userResponse = await fetch('https://chill-gamer-server-v1.vercel.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!userResponse.ok) {
                throw new Error('Failed to save user data');
            }

            // Then perform server login
            await handleServerLogin(result.user.email);

            toast.success('Google sign-in successful!');
            navigate('/');
        } catch (error) {
            console.error('Google Sign-in error:', error);
            toast.error(error.message || 'Failed to sign in with Google');
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
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email</label>
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
                            <label className="block text-sm font-medium text-gray-300">Password</label>
                            <input
                                {...register('password')}
                                type="password"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
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
                                    Loading...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-400 bg-gray-800/50">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full px-4 py-2 flex items-center justify-center space-x-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300"
                        >
                            <FaGoogle className="text-red-500" />
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    <p className="mt-6 text-center text-gray-400">
                        Don't have an account?{' '}
                        <Link 
                            to="/register" 
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                        >
                            Register here
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;