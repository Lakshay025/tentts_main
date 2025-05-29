import React, { useEffect, useState } from 'react';
import iphone1 from '../assets/images/iphone1.png';
import iphone2 from '../assets/images/iphone2.png';
import appleicon from '../assets/images/apple-icon.svg';
import googleplay from '../assets/images/google-play-icon.svg';
import axios from 'axios';

const EventSection = () => {
    const [eventData, setEventData] = useState({
        title: '',
        descriptions: '',
        playStoreLink: '',
        appStoreLink: ''
    });

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(
                    'https://tentts.com/gateway/api/v1/admin/website/getWebsiteSection?sectionType=BANNER'
                );
                if (response.data && response.data.responseBody) {
                    setEventData(response.data.responseBody);
                }
            } catch (error) {
                console.error('Failed to fetch event section data:', error);
            }
        };

        fetchEventData();
    }, []);

    return (
        <section className="bg-[#1B1A1D] text-white py-40 overflow-hidden">
            <div className="w-full bg-[#267FFF] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-5 relative">
                {/* Left Side: Text + Buttons */}
                <div className="w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0 px-6 md:px-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {eventData.title?.split('<br />').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index !== eventData.title.split('<br />').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>
                    <p className="text-gray-300 mb-6">
                        {eventData.descriptions}
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        {eventData.appStoreLink && (
                            <a href={eventData.appStoreLink} target="_blank" rel="noopener noreferrer">
                                <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-4 py-2 mb-5 rounded-lg shadow-md transition duration-300 hover:shadow-[0_0_20px_#267FFF]">
                                    <img src={appleicon} alt="App Store" className="w-5 h-5" />
                                    APP STORE
                                </button>
                            </a>
                        )}
                        {eventData.playStoreLink && (
                            <a href={eventData.playStoreLink} target="_blank" rel="noopener noreferrer">
                                <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-4 py-2 mb-5 rounded-lg shadow-md transition duration-300 hover:shadow-[0_0_20px_#267FFF]">
                                    <img src={googleplay} alt="Play Store" className="w-5 h-5" />
                                    PLAY STORE
                                </button>
                            </a>
                        )}
                    </div>
                </div>

                {/* Right Side: iPhone Images */}
                <div className="relative w-full md:w-1/2 flex justify-center px-4 md:px-20 -mt-16 overflow-hidden">
                    <img
                        src={iphone2}
                        alt="iPhone 2"
                        className="w-[230px] md:w-[310px] z-0 relative"
                    />
                    <img
                        src={iphone1}
                        alt="iPhone 1"
                        className="w-[230px] md:w-[310px] absolute left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-0 z-10"
                    />
                </div>
            </div>
        </section>
    );
};

export default EventSection;
