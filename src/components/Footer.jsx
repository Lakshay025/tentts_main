import React from "react";
import footerBg from "../assets/images/footer-bg.png";

const Footer = () => {
    return (
        <div className="py-20">
            <div
                className="max-w-7xl mx-auto rounded-xl p-8 md:p-24 text-white"
                style={{
                    backgroundImage: `url(${footerBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Left Text */}
                    <div className="text-center md:text-left">
                        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Stay in the <br /> Loop!
                        </h2>
                    </div>

                    {/* Right Form */}
                    <div className="flex-1 w-full max-w-xl">
                        <p className="mb-8 text-base md:text-lg">
                            Get the latest event trends, updates, and exclusive offers.
                        </p>
                        <form className="w-full">
                            <div className="relative w-full max-w-xl mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-4 pr-32 rounded-lg bg-white/10 text-white placeholder-white backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button
                                    type="submit"
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-sm text-gray-200">
                            By clicking Sign Up you're confirming that you agree with our{" "}
                            <a href="#" className="underline">
                                Terms and Conditions
                            </a>
                            .
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;
