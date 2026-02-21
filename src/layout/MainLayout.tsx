import { Outlet } from 'react-router';
import Header from '../components/Header';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="mx-auto m-4">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
