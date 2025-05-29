import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
    const [contactData, setContactData] = useState({
        title: '',
        descriptions: '',
        mediaUrl: ''
    });

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await axios.get(
                    'https://tentts.com/gateway/api/v1/admin/website/getWebsiteSection?sectionType=CONTACT_US'
                );
                const data = response.data.responseBody;

                setContactData({
                    title: data.title || 'Contact Us',
                    descriptions: data.descriptions || '',
                    mediaUrl: data.mediaUrl || ''
                });
            } catch (error) {
                console.error('Failed to fetch contact section:', error);
            }
        };

        fetchContactData();
    }, []);

    return (
        <section id="contact" className="bg-[#27282F] py-16 px-6 md:px-20 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Left: Form */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-white text-3xl font-bold mb-4">
                        {contactData.title && (
                            <>
                                {contactData.title.split(' ')[0]}{' '}
                                <span className="text-white font-extrabold">
                                    {contactData.title.split(' ').slice(1).join(' ')}
                                </span>
                            </>
                        )}
                    </h2>
                    <p className="text-gray-400 mb-8">
                        {contactData.descriptions}
                    </p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-white">Name</label>
                                <input
                                    type="text"
                                    placeholder="Erika Gofas"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-[#2b2d35] text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-white">Email</label>
                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-[#2b2d35] text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-white">Phone</label>
                                <input
                                    type="text"
                                    placeholder="(123) 456 - 7890"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-[#2b2d35] text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-white">Company</label>
                                <input
                                    type="text"
                                    placeholder="Automate Agency"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-[#2b2d35] text-white focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-white">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Type your message here..."
                                className="w-full mt-1 px-4 py-2 rounded-md bg-[#2b2d35] text-white focus:outline-none overflow-hidden resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition"
                        >
                            Get In Touch
                        </button>
                    </form>
                </div>

                {/* Right: Image from API */}
                <div className="w-full lg:w-1/2">
                    {contactData.mediaUrl && (
                        <img
                            src={contactData.mediaUrl}
                            alt="Contact Illustration"
                            className="rounded-xl w-full object-cover"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
