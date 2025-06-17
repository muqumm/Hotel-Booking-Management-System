import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = ({ isAdmin, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Hotel Management & Booking System
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link">About Us</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/contact" className="navbar-link">Contact Us</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/booking" className="navbar-link">Book a Room</Link>
                    </li>
                    {!isAdmin ? (
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/admin" className="navbar-link">Admin</Link>
                            </li>
                            <li className="navbar-item">
                                <button onClick={handleLogout} className="navbar-link">Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;