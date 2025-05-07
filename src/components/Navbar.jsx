import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check for logged-in user on component mount
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            // Check if we have registered user data with name
            const registeredUser = JSON.parse(localStorage.getItem('registeredUser')) || {};
            setUser({
                ...parsedUser,
                // Use name from registration if available, fallback to username
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

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <nav className="absolute top-0 left-0 w-full z-20 px-4 sm:px-10 py-4 bg-transparent">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full relative">
                {/* Logo */}
                <div className="mb-4 sm:mb-0">
                    <img src={logo} alt="Logo" className="w-20 h-20" />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="sm:hidden fixed right-4 top-4 text-white z-50 p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    {isMenuOpen ? (
                        <FaTimes size={24} className="text-white" />
                    ) : (
                        <FaBars size={24} className="text-white" />
                    )}
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
                            <motion.div
                                className="bg-white/10 rounded-xl p-8 w-4/5 max-w-md border border-white/20"
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <ul className="flex flex-col items-center space-y-6">
                                    <motion.li variants={itemVariants} className="w-full text-center">
                                        <a
                                            href="#home"
                                            className="block py-3 px-4 rounded-lg hover:bg-white/20 transition-colors duration-200 text-xl font-medium"
                                            onClick={toggleMenu}
                                        >
                                            Home
                                        </a>
                                    </motion.li>
                                    <motion.li variants={itemVariants} className="w-full text-center">
                                        <a
                                            href="#about"
                                            className="block py-3 px-4 rounded-lg hover:bg-white/20 transition-colors duration-200 text-xl font-medium"
                                            onClick={toggleMenu}
                                        >
                                            About Us
                                        </a>
                                    </motion.li>
                                    <motion.li variants={itemVariants} className="w-full text-center">
                                        <a
                                            href="#pricing"
                                            className="block py-3 px-4 rounded-lg hover:bg-white/20 transition-colors duration-200 text-xl font-medium"
                                            onClick={toggleMenu}
                                        >
                                            Pricing Plans
                                        </a>
                                    </motion.li>
                                    <motion.li variants={itemVariants} className="w-full text-center">
                                        <a
                                            href="#contact"
                                            className="block py-3 px-4 rounded-lg hover:bg-white/20 transition-colors duration-200 text-xl font-medium"
                                            onClick={toggleMenu}
                                        >
                                            Contact Us
                                        </a>
                                    </motion.li>
                                </ul>

                                <motion.div
                                    variants={itemVariants}
                                    className="mt-8 flex justify-center"
                                >
                                    {user ? (
                                        <div className="relative">
                                            <button 
                                                onClick={toggleUserDropdown}
                                                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full text-base transition-colors duration-200"
                                            >
                                                <span>Welcome, {user.name}</span>
                                                <FaChevronDown size={14} />
                                            </button>
                                            
                                            {isUserDropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-md shadow-lg z-30">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-3 text-left text-white hover:bg-blue-500 transition-colors duration-200"
                                                    >
                                                        <FaSignOutAlt className="mr-2" />
                                                        Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link to="/login" onClick={toggleMenu}>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full text-base transition-colors duration-200">
                                                Sign In
                                            </button>
                                        </Link>
                                    )}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Nav Links */}
                <div className="hidden sm:block sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 mb-4 sm:mb-0">
                    <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-10 text-gray-400 font-medium bg-white/10 px-6 py-3 rounded-full backdrop-blur-md text-sm sm:text-base">
                        <li><a href="#home" className="hover:text-white transition-colors duration-200">Home</a></li>
                        <li><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
                        <li><a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing Plans</a></li>
                        <li><a href="#contact" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                    </ul>
                </div>

                {/* Desktop User Dropdown */}
                <div className="hidden sm:block">
                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={toggleUserDropdown}
                                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full text-sm sm:text-base transition-colors duration-200"
                            >
                                <span>Welcome, {user.name}</span>
                                <FaChevronDown size={14} />
                            </button>
                            
                            <AnimatePresence>
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
                                            className="flex items-center w-full px-4 py-3 text-left text-white hover:bg-blue-500 transition-colors duration-200"
                                        >
                                            <FaSignOutAlt className="mr-2" />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-12 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-colors duration-200">
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