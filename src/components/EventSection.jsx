import React from 'react';
import iphone1 from '../assets/images/iphone1.png'
import iphone2 from '../assets/images/iphone2.png'
import appleicon from '../assets/images/apple-icon.svg'
import googleplay from '../assets/images/google-play-icon.svg'

const EventSection = () => {
    return (
        <section className="bg-[#1B1A1D] text-white py-40 overflow-hidden">
            <div className="w-full bg-[#267FFF] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-5 relative">
                {/* Left Side: Text + Buttons */}
                <div className="w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0 px-6 md:px-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Manage Events <br />
                        <span className="text-white">On the go!</span>
                    </h2>
                    <p className="text-gray-300 mb-6">
                        From spontaneous meetups to high-profile events, <br className="hidden md:block" />
                        control everything from your phone
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-4 py-2 mb-5 rounded-lg shadow-md transition duration-300 hover:shadow-[0_0_20px_#267FFF]">
                            <img src={appleicon} alt="App Store" className="w-5 h-5" />
                            APP STORE
                        </button>
                        <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-4 py-2 mb-5 rounded-lg shadow-md transition duration-300 hover:shadow-[0_0_20px_#267FFF]">
                            <img src={googleplay} alt="Play Store" className="w-5 h-5" />
                            PLAY STORE
                        </button>
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