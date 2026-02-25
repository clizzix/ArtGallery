import { MdHome } from 'react-icons/md';
import { RiGalleryView2 } from 'react-icons/ri';
import { NavLink, Link } from 'react-router';

const Header = () => {
    return (
        <div className="navbar glass-header">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Art Institute of Chicago
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? 'bg-white/20 text-white shadow-inner'
                                        : 'text-white/60 hover:bg-white/10'
                                }`
                            }
                        >
                            <MdHome size={24} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/gallery"
                            className={({ isActive }) =>
                                `rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? 'bg-white/20 text-white shadow-inner'
                                        : 'text-white/60 hover:bg-white/10'
                                }`
                            }
                        >
                            <RiGalleryView2 size={24} />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
