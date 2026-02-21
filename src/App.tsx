import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ArtworkDetails from './pages/ArtworkDetails';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/gallery" element={<Outlet />}>
                        <Route index element={<Gallery />} />
                        <Route path=":detail" element={<ArtworkDetails />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
