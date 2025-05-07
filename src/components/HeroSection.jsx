import React from 'react';
import { Link } from 'react-router-dom';
import herobg from '../assets/images/hero-bg.png';
import Navbar from './Navbar';

const HeroSection = () => {
    return (
        <div id="home" className="relative h-screen w-full text-white">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${herobg})` }}
            >
                <div className="absolute inset-0 bg-black opacity-70" />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 md:px-20 max-w-4xl">
                <h1 className="text-4xl mt-20 md:text-6xl font-extrabold leading-tight">
                    Don't Just Host Events<br />Build Experiences
                </h1>
                <p className="mt-12 text-lg italic font-bold text-white/90">
                    Post what's coming. Share what happened. Stay connected.
                </p>
                <div className="mt-30 flex space-x-5">
                    <a href="#contact">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-10 py-3 rounded-full transition-colors duration-200">
                            Get In Touch
                        </button>
                    </a>
                    <Link to="/register">
                        <button className="border border-white hover:bg-white hover:text-black font-semibold px-10 py-3 rounded-full transition-colors duration-200">
                            Register Now!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;