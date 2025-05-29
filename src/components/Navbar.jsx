import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const res = await axios.get('https://tentts.com/gateway/api/v1/admin/website/getWebsiteSection?sectionType=HOME');
                setLogoUrl(res.data.responseBody.logoUrl);
            } catch (err) {
                console.error('Error fetching logo:', err);
            }
        };

        fetchLogo();

        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            const registeredUser = JSON.parse(localStorage.getItem('registeredUser')) || {};
            setUser({
                ...parsedUser,
                name: registeredUser.name || parsedUser.username
            });
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsUserDropdownOpen(false);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsUserDropdownOpen(false);
        navigate('/login');
    };

    return (
        <nav className="absolute top-0 left-0 w-full z-20 px-4 sm:px-10 py-4 bg-transparent">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full relative">
                {/* Logo */}
                <div className="mb-4 sm:mb-0">
                    <img
                        src={logoUrl || '/default-logo.png'}
                        alt="Logo"
                        className="w-20 h-20 object-contain"
                    />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="sm:hidden fixed right-4 top-4 text-white z-50 p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="sm:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div className="bg-white/10 rounded-xl p-8 w-4/5 max-w-md border border-white/20">
                                <ul className="flex flex-col items-center space-y-6">
                                    {['home', 'about', 'pricing', 'contact'].map((item) => (
                                        <li key={item}>
                                            <a
                                                href={`#${item}`}
                                                className="block py-3 px-4 rounded-lg hover:bg-white/20 text-xl font-medium"
                                                onClick={toggleMenu}
                                            >
                                                {item.replace(/^\w/, c => c.toUpperCase())}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 flex justify-center">
                                    {user ? (
                                        <div className="relative">
                                            <button
                                                onClick={toggleUserDropdown}
                                                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full"
                                            >
                                                <span>Welcome, {user.name}</span>
                                                <FaChevronDown size={14} />
                                            </button>
                                            {isUserDropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-md shadow-lg z-30">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-3 text-left text-white hover:bg-blue-500"
                                                    >
                                                        <FaSignOutAlt className="mr-2" />
                                                        Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link to="/login" onClick={toggleMenu}>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full">
                                                Sign In
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Menu */}
                <ul className="hidden sm:flex justify-center space-x-10 text-gray-400 font-medium bg-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                    <li><a href="#home" className="hover:text-white">Home</a></li>
                    <li><a href="#about" className="hover:text-white">About Us</a></li>
                    <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                    <li><a href="#contact" className="hover:text-white">Contact</a></li>
                </ul>

                {/* Desktop User Button */}
                <div className="hidden sm:block">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={toggleUserDropdown}
                                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full"
                            >
                                <span>Welcome, {user.name}</span>
                                <FaChevronDown size={14} />
                            </button>
                            {isUserDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-md shadow-lg z-30"
                                >
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-3 text-left text-white hover:bg-blue-500"
                                    >
                                        <FaSignOutAlt className="mr-2" />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
