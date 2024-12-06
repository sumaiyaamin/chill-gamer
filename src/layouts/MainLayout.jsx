import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'


const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
           
        </div>
    )
}

export default MainLayout