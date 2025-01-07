import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
    FaFacebookF, 
     
    FaGithub ,
    FaDiscord, 
    
    FaGamepad,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
    const { isDark } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${
            isDark 
                ? 'bg-gradient-to-b from-[#1a1c2e] to-[#0f111a] text-gray-300' 
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600'
        }`}>
            

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-11 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <FaGamepad className="text-2xl text-purple-500" />
                            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Chill Gamer
                            </h2>
                        </div>
                        <p className="text-sm mb-4">
                            Your trusted source for honest game reviews and gaming community insights.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-purple-500" />
                                <span>support@chillgamer.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-purple-500" />
                                <span>+88 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-purple-500" />
                                <span>123 Gaming Street, CA 94107</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-purple-500 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/reviews" className="hover:text-purple-500 transition-colors">All Reviews</Link>
                            </li>
                            <li>
                                <Link to="/add-review" className="hover:text-purple-500 transition-colors">Write Review</Link>
                            </li>
                            <li>
                                <Link to="/my-reviews" className="hover:text-purple-500 transition-colors">My Reviews</Link>
                            </li>
                            <li>
                                <Link to="/my-watchlist" className="hover:text-purple-500 transition-colors">My Watchlist</Link>
                            </li>
                        </ul>
                    </div>

                   

                   
                </div>

                {/* Social Links */}
                <div className="border-t border-gray-700/50 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            {[
                                { href: "https://www.facebook.com/sumaiyaaaaaaaaaaaaaaaaaaaaamin/", icon: FaFacebookF, label: "Facebook" },
                                { href: "https://github.com/sumaiyaamin", icon: FaGithub, label: "Github" },
                               
                                
                                { href: "https://discord.com/channels/1254673307735691376/1254693461378994187", icon: FaDiscord, label: "Discord" },
                                
                            ].map(({ href, icon: Icon, label }) => (
                                <a 
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className={`${
                                        isDark ? 'bg-gray-800' : 'bg-gray-200'
                                    } p-2 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300`}
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                        <div className="text-sm text-center md:text-right">
                            <p>© {currentYear} Sumaiya Amin Prova. All rights reserved.</p>
                            <p className="mt-1">
                                Made with ❤ for gamers by gamers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
