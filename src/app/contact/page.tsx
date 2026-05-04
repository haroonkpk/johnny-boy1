"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

// --- InfoCard Component (Clean Version) ---
const InfoCard = ({ icon, title, val, delay, borderColor }) => {
    return (
        <motion.div
            initial={{ opacity: 0, height: "100px", width: "80px", borderRadius: "50px" }}
            whileInView={{ opacity: 1, height: "auto", width: "100%", borderRadius: "24px" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: delay, type: "spring", stiffness: 60 }}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ borderBottomColor: borderColor }}
            // Background removed, only blur and shadow kept for depth
            className='p-8 flex items-center space-x-6 border-b-8 overflow-hidden'
        >
            <div 
                className="w-14 h-14 min-w-[56px] rounded-2xl text-white flex items-center justify-center text-xl shadow-md"
                style={{ backgroundColor: borderColor }}
            >
                {icon}
            </div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.4 }}
            >
                <p className='text-gray-500 text-xs font-bold uppercase tracking-widest'>{title}</p>
                <p className='text-gray-900 font-bold text-lg whitespace-nowrap'>{val}</p>
            </motion.div>
        </motion.div>
    );
};

const Contact = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className='relative pt-24 pb-24 bg-gray-50 overflow-hidden min-h-screen'>
            
            {/* Rainbow Path */}
           
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
            >
                <defs>
                    <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff0000" />
                        <stop offset="20%" stopColor="#ff7f00" />
                        <stop offset="40%" stopColor="#ffff00" />
                        <stop offset="60%" stopColor="#00ff00" />
                        <stop offset="80%" stopColor="#0000ff" />
                        <stop offset="100%" stopColor="#8b00ff" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M -100 100 
                       C 200 100, 400 300, 500 500 
                       C 700 700, 700 300, 500 300 
                       C 300 300, 300 700, 500 700 
                       C 700 700, 900 800, 1200 950"
                    fill="none"
                    stroke="url(#rainbowGradient)" // Rainbow apply yahan ho raha hai
                    strokeWidth="25"
                    strokeLinecap="round"
                    strokeOpacity="0.4" // Visibility thodi barhayi hai rainbow ke liye
                    vectorEffect="non-scaling-stroke"
                    style={{
                        pathLength: pathLength,
                        opacity: opacity,
                    }}
                />
            </svg>

                 <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">Have a question or want to get in touch? We'd love to hear from you.</p>
      </div>
            <div className='relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 w-[90%] lg:w-[80%] items-start mx-auto mt-16'>
                {/* Form Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100'
                >
                    <h2 className='text-3xl font-bold text-gray-800 mb-8'>Send a Message</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder='Name' className='bg-gray-50 border border-gray-200 w-full px-6 py-4 rounded-2xl text-gray-800 outline-none focus:border-blue-300 transition-all' />
                            <input type="email" placeholder='Email' className='bg-gray-50 border border-gray-200 w-full px-6 py-4 rounded-2xl text-gray-800 outline-none focus:border-blue-300 transition-all' />
                        </div>
                        <textarea rows={5} placeholder='Message' className='bg-gray-50 border border-gray-200 w-full px-6 py-4 rounded-2xl text-gray-800 outline-none focus:border-blue-300 transition-all' />
                        
                        {/* Light/Soft Rainbow Button */}
                     
                        <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.99 }}
                            className='relative overflow-hidden w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-white group shadow-lg shadow-blue-100'
                        >
                            {/* Pastel Rainbow Gradient Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,#A5CCF9,#D2B4F9,#F9B4D2,#B4F9D2,#A5CCF9)] bg-[length:200%_200%] animate-[softGradient_4s_ease_infinite]" />
                            
                            <span className="relative z-10 flex items-center justify-center gap-3 text-gray-800">
                                Submit Now <span>→</span>
                            </span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Info Cards (Transparent Background) */}
                <div className='lg:col-span-1 flex flex-col gap-8'>
                    <InfoCard 
                        icon={<FaPhoneAlt />} 
                        title="Call" 
                        val="+555 67676734" 
                        delay={0.1} 
                        borderColor="#60a5fa" // Light Blue
                    />
                    <InfoCard 
                        icon={<FaEnvelope />} 
                        title="Email" 
                        val="info@example.com" 
                        delay={0.3} 
                        borderColor="#c084fc" // Soft Purple
                    />
                    <InfoCard 
                        icon={<FaMapMarkerAlt />} 
                        title="Location" 
                        val="New York, USA" 
                        delay={0.5} 
                        borderColor="#f472b6" // Soft Pink
                    />
                </div>
            </div>

            {/* CSS Animation for Light Rainbow */}
            <style jsx global>{`
                @keyframes softGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default Contact;