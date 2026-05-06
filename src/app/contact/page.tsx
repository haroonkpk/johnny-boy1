
"use client";

import React, { useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

/* ---------------- TYPES ---------------- */
interface InfoCardProps {
    icon: ReactNode;
    title: string;
    val: string;
    delay?: number;
    accentColor: string;
}

/* ---------------- INFO CARD (Glass Style) ---------------- */
const InfoCard = ({ icon, title, val, delay = 0, accentColor }: InfoCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="p-6 flex items-center space-x-5 bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl"
        >
            <div 
                className="w-12 h-12 flex items-center justify-center rounded-2xl text-white shadow-lg"
                style={{ backgroundColor: accentColor }}
            >
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[2px]">
                    {title}
                </p>
                <p className="text-white font-semibold text-base">
                    {val}
                </p>
            </div>
        </motion.div>
    );
};

/* ---------------- CONTACT PAGE ---------------- */
const Contact = () => {
    return (
        <div className="relative min-h-screen bg-[#0a0a0a] py-20 overflow-hidden">
            
            {/* Background Glows (Background ko boring hone se bachane ke liye) */}
            <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                
               
                  <div className="mb-16 text-center">
     
         <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Us</span>
          </h2>
        {/* <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div> */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
         Have a question or want to get in touch? We'd love to hear from you.

        </p>
      </div>

                <div className="grid   items-center">
                    
                    {/* LEFT SIDE: INFO CARDS */}
                    {/* <div className="lg:col-span-4 flex flex-col gap-5">
                        <InfoCard
                            icon={<FaPhoneAlt />}
                            title="Call Us"
                            val="+92 300 1234567"
                            delay={0.1}
                            accentColor="#3b82f6"
                        />
                        <InfoCard
                            icon={<FaEnvelope />}
                            title="Email"
                            val="hello@agency.com"
                            delay={0.2}
                            accentColor="#8b5cf6"
                        />
                        <InfoCard
                            icon={<FaMapMarkerAlt />}
                            title="Location"
                            val="UK"
                            delay={0.3}
                            accentColor="#ec4899"
                        />
                    </div> */}

                    {/* RIGHT SIDE: CLEAN WHITE FORM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-white rounded-[40px] p-8 md:p-12 shadow-2xl"
                    >
                        <h3 className="text-3xl font-bold text-black mb-8">Send Message</h3>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full bg-gray-100 border-none px-6 py-4 rounded-2xl text-black outline-none focus:ring-2 ring-blue-500/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full bg-gray-100 border-none px-6 py-4 rounded-2xl text-black outline-none focus:ring-2 ring-blue-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help?"
                                    className="w-full bg-gray-100 border-none px-6 py-4 rounded-2xl text-black outline-none focus:ring-2 ring-blue-500/20 transition-all resize-none"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 rounded-2xl font-bold text-white bg-black hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <span className="text-xl">→</span>
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;