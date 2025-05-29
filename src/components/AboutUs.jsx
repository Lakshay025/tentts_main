import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutUs = () => {
    const [aboutData, setAboutData] = useState({
        title: '',
        descriptions: '',
        mediaUrl: ''
    });

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get(
                    'https://tentts.com/gateway/api/v1/admin/website/getWebsiteSection?sectionType=ABOUT_US'
                );
                if (response.data && response.data.responseBody) {
                    setAboutData(response.data.responseBody);
                }
            } catch (error) {
                console.error('Failed to fetch About Us section data:', error);
            }
        };

        fetchAboutData();
    }, []);

    return (
        <section id="about" className="bg-[#1B1A1D] text-white py-12 px-4 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 mt-10">

                {/* Dynamic Image from API */}
                <div className="w-full md:w-1/2">
                    {aboutData.mediaUrl ? (
                        <img
                            src={aboutData.mediaUrl}
                            alt="About Us"
                            className="rounded-xl w-full object-cover"
                        />
                    ) : (
                        <div className="rounded-xl w-full h-[300px] bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-400">Image loading...</span>
                        </div>
                    )}
                </div>

                {/* Dynamic Text Content */}
                <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        {aboutData.title}
                    </h2>   
                    <p className="text-gray-200 text-sm sm:text-base leading-loose">
                        {aboutData.descriptions}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
