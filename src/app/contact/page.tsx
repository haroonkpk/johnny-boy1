

"use client";

import React, { useRef, ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useActionState } from "react"; 
import { handleContactForm } from "@/actions/contact"; 

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

/* ---------------- TYPES ---------------- */
interface InfoCardProps {
    icon: ReactNode;
    title: string;
    val: string;
    delay?: number;
    accentColor: string;
}

/* ---------------- INFO CARD ---------------- */
const InfoCard = ({ icon, title, val, delay = 0, accentColor }: InfoCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="p-6 flex items-center space-x-5 bg-white border border-gray-100 shadow-sm rounded-3xl"
        >
            <div 
                className="w-12 h-12 flex items-center justify-center rounded-2xl text-white shadow-md"
                style={{ backgroundColor: accentColor }}
            >
                {icon}
            </div>
            <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[2px]">
                    {title}
                </p>
                <p className="text-gray-900 font-bold text-base">
                    {val}
                </p>
            </div>
        </motion.div>
    );
};

/* ---------------- CONTACT PAGE ---------------- */
const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState("");

    const validateEmail = (val: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(val);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmailValue(val);
        if (val && !validateEmail(val)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!validateEmail(emailValue)) {
            e.preventDefault();
            setEmailError("Please enter a valid email address.");
            toast.error("Please enter a valid email address.");
            return;
        }
    };

    const [state, formAction, isPending] = useActionState(handleContactForm, null);

//   success full message
useEffect(() => {
    if (!state) return;

    if (state.success) {
        toast.success(state.message || "Message sent successfully!");
        formRef.current?.reset();
        setEmailValue("");
        setEmailError("");
    } else {
        toast.error(state.message || "Something went wrong!");
    }
}, [state]);

    return (
   <div className="relative min-h-screen bg-[var(--color-cream)] overflow-hidden">

            <PageHero 
              title={<>Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Us</span></>}
              subtitle="Have a question or want to get in touch? We'd love to hear from you."
              badge="Get in Touch"
            />
       
                
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

                <div className="grid   items-center">
                    {/* FORM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        <Card variant="light" className="p-8 md:p-12 border-none shadow-xl rounded-[2.5rem] bg-white/90 backdrop-blur-sm">
                            <h3 className="text-3xl font-bold text-black mb-8">Send Message</h3>
                            
                            <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        name="name"
                                        label="Name"
                                        type="text"
                                        placeholder="Your name"
                                        required
                                        disabled={isPending}
                                    />
                                    <div className="flex flex-col gap-1">
                                        <Input
                                            name="email"
                                            label="Email"
                                            type="email"
                                            placeholder="email@example.com"
                                            required
                                            disabled={isPending}
                                            value={emailValue}
                                            onChange={handleEmailChange}
                                        />
                                        {emailError && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <span>⚠</span> {emailError}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Textarea
                                    name="message"
                                    label="Message"
                                    rows={5}
                                    placeholder="How can we help?"
                                    required
                                    disabled={isPending}
                                />

                         

                                <Button
                                    type="submit"
                                    variant="secondary"
                                    className="w-full py-4 text-lg"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <span className="text-xl ml-2">→</span>
                                        </>
                                    )}
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