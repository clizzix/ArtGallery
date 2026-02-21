import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="mx-auto m-4">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
