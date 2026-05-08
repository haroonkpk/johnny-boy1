"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Signup = () => {
    return (
        <div className="relative min-h-screen bg-[#0a0a0a] py-20 overflow-hidden">

            {/* Background Glows */}
            <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-5xl mx-auto px-6">

                <SectionHeading
                    title={<>Sign <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Up</span></>}
                    subtitle="Create your account and get started"
                    badge="Register"
                    mode="dark"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Card className="p-8 md:p-12 bg-white rounded-2xl">

                        <form className="space-y-6">

                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="First Name *" placeholder="First name" />
                                <Input label="Last Name *" placeholder="Last name" />
                            </div>

                            {/* Contact */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Email Address *" type="email" placeholder="email@example.com" />
                                <Input label="Phone *" type="tel" placeholder="+92..." />
                            </div>

                            {/* Password */}
                            <Input label="User Password *" type="password" placeholder="••••••••" />

                            {/* Business Info */}
                            <Input label="Business Name *" placeholder="Your business name" />
                            <Input label="Store Address" placeholder="Full store address" />

                            {/* Sales + Website */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Anticipated Monthly Unit Sales *" placeholder="e.g. 500" />
                                <Input label="Website" placeholder="https://..." />
                            </div>

                            {/* Intro */}
                            <Textarea
                                label="A brief Intro *"
                                rows={4}
                                placeholder="Tell us about your business..."
                            />

                            {/* Terms */}
                            <div className="text-sm text-gray-600 space-y-2">
                                <p className="font-medium">Terms of Use *</p>
                                <p>
                                    By sending this form you agree to our Privacy Policy and Terms of Service.
                                </p>
                            </div>

                            {/* Submit */}
                            <Button className="w-full py-3 text-lg">
                                Submit
                            </Button>

                        </form>

                    </Card>
                </motion.div>

            </div>
        </div>
    );
};

export default Signup;