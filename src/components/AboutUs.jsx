import React from 'react';
import aboutus from '../assets/images/aboutus.png';

const AboutUs = () => {
    return (
        <section id="about" className="bg-[#1B1A1D] text-white py-12 px-4 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 mt-10">
                
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <img
                        src={aboutus}
                        alt="About Us"
                        className="rounded-xl w-full object-cover"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">About Us</h2>
                    <h3 className="text-lg sm:text-xl font-semibold">
                        Built for Event Lovers, by Event Lovers!
                    </h3>
                    <p className="text-gray-200 text-sm sm:text-base">
                        At Eventora, we believe that every event tells a story — from the spark of an idea to the echoes of applause. Our platform empowers creators, communities, and attendees to celebrate live moments and keep the memories alive.
                    </p>
                    <p className="text-gray-200 text-sm sm:text-base">
                        Whether you're organizing a music festival, a startup pitch night, or a photo exhibition, Eventora gives you the tools to promote, engage, and archive effortlessly.
                    </p>
                    <p className="text-gray-200 text-sm sm:text-base">
                        Whether you're organizing a music festival, a startup pitch night, or a photo exhibition, Eventora gives you the tools to promote, engage, and archive effortlessly.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
