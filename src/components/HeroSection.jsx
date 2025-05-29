import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const HeroSection = () => {
    const [heroData, setHeroData] = useState({
        title: '',
        description: '',
        backgroundImage: '',
        logo: ''
    });

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await axios.get('https://tentts.com/gateway/api/v1/admin/website/getWebsiteSection?sectionType=HOME');
                if (response.data && response.data.responseBody) {
                    const data = response.data.responseBody;
                    setHeroData({
                        title: data.title,
                        description: data.descriptions,
                        backgroundImage: data.mediaUrl,
                        logo: data.logoUrl
                    });
                }
            } catch (error) {
                console.error('Failed to fetch hero section data:', error);
            }
        };

        fetchHeroData();
    }, []);

    return (
        <div id="home" className="relative h-screen w-full text-white">
            {/* Dynamic Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black opacity-70" />
            </div>

            {/* Pass dynamic logo to Navbar */}
            <Navbar logo={heroData.logo} />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 md:px-20 max-w-4xl">
                <h1 className="text-4xl mt-20 md:text-6xl font-extrabold leading-tight">
                    {heroData.title?.split('<br />').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index !== heroData.title.split('<br />').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h1>
                <p className="mt-12 text-lg italic font-bold text-white/90">
                    {heroData.description}
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
