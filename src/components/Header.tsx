import { MdHome } from 'react-icons/md';
import { RiGalleryView2 } from 'react-icons/ri';
import { Link } from 'react-router';

const Header = () => {
    return (
        <div className="navbar glass-header">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Art Gallery
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">
                            <MdHome size={24} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/gallery">
                            <RiGalleryView2 size={24} />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
