
"use client";

import React, { useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
                
                <SectionHeading 
                  title={<>Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Us</span></>}
                  subtitle="Have a question or want to get in touch? We'd love to hear from you."
                  badge="Get in Touch"
                  mode="dark"
                />

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
                        className="lg:col-span-8"
                    >
                        <Card variant="primary" className="p-8 md:p-12 border-none bg-white">
                            <h3 className="text-3xl font-bold text-black mb-8">Send Message</h3>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Name"
                                        type="text"
                                        placeholder="Your name"
                                    />
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <Textarea
                                    label="Message"
                                    rows={5}
                                    placeholder="How can we help?"
                                />

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <span>Send Message</span>
                                    <span className="text-xl">→</span>
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;