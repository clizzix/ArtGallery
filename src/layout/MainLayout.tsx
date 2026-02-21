import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Header />
            <div className="mx-auto m-4 min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
