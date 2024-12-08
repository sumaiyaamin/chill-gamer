import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../components/contexts/AuthContext';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1c2e]">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-8 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            
        </div>
    );
};

export default MainLayout;