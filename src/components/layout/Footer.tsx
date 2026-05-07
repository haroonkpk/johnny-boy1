
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BiCalendar } from "react-icons/bi";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Footer = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <footer className="pt-20 pb-10 bg-[#05070a] overflow-hidden border-t border-white/5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-[85%] lg:w-[80%] mx-auto grid items-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* 1st part: Logo & Socials */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center space-x-2">
            <img
              src="/images/jhonny.png"
              alt="Company Logo"
              className="w-60 h-auto object-contain"
            />
          </div>
          <p className="mt-6 text-sm text-white/70 leading-7">
            Conditions Terms of Use Ours features in Services new Guests List.
            The Team List Guests List The Team List.
          </p>
          <div className="flex items-center space-x-4 mt-8">
            {/* Facebook */}
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#937ef1] hover:shadow-[0_0_15px_#937ef1] hover:-translate-y-1 transition-all duration-300 group">
              <FaFacebook className="text-white" />
            </div>
            {/* YouTube */}
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:-translate-y-1 transition-all duration-300">
              <FaYoutube className="text-white" />
            </div>
            {/* Instagram */}
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-gradient-to-tr hover:from-[#937ef1] hover:to-[#3ac8ee] hover:shadow-[0_0_15px_#3ac8ee] hover:-translate-y-1 transition-all duration-300">
              <FaInstagram className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* 2nd part: Address */}
        <motion.div variants={itemVariants} className="lg:mx-auto">
          <h1 className="text-lg font-bold text-white border-b-2 border-white/20 hover:border-[#3ac8ee] transition-colors w-fit pb-1">
            Address
          </h1>
          <div className="mt-8 space-y-4">
            <div className="flex items-start space-x-4 group">
              <FaPaperPlane className="w-5 h-5 text-white group-hover:text-[#937ef1] transition-colors mt-1" />
              <p className="text-sm text-white/80">
                Old city Street, USA <br /> 1212 New York-3500
              </p>
            </div>
            <div className="flex items-center space-x-4 group">
              <FaPhone className="w-5 h-5 text-white group-hover:text-[#3ac8ee] transition-colors" />
              <p className="text-sm text-white/80">+88 014 420420</p>
            </div>
            <div className="flex items-center space-x-4 group">
              <IoMailOpen className="w-5 h-5 text-white group-hover:text-[#937ef1] transition-colors" />
              <p className="text-sm text-white/80">examp@gmail.com</p>
            </div>
          </div>
        </motion.div>

        {/* 3rd part: Quick Links */}
        <motion.div variants={itemVariants} className="lg:mx-auto">
          <h1 className="text-lg font-bold text-white border-b-2 border-white/20 hover:border-[#937ef1] transition-colors w-fit pb-1 mb-6">
            Quick Links
          </h1>
          <div className="space-y-3">
            {["Products", "Contact", "Services", "Series"].map((link) => (
              <motion.div
                key={link}
                whileHover={{ x: 10 }}
                className="flex items-center space-x-2 group cursor-pointer"
              >
                <MdKeyboardDoubleArrowRight className="w-5 h-5 text-white group-hover:text-[#3ac8ee] transition-colors" />
                <p className="text-sm text-white/80 group-hover:text-[#3ac8ee] transition-colors">
                  {link}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4th part: Latest News */}
        <motion.div variants={itemVariants}>
          <h1 className="text-lg font-bold text-white border-b-2 border-white/20 hover:border-[#3ac8ee] transition-colors w-fit pb-1 mb-6">
            Latest News
          </h1>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-[#3ac8ee]/50 transition-all group cursor-pointer">
            <div className="mt-3">
              <div className="flex items-center text-white group-hover:text-[#937ef1] transition-colors text-xs font-bold">
                <BiCalendar className="mr-1" />
                <span>25 OCT, 2026</span>
              </div>
              <p className="text-white text-sm font-bold mt-1 group-hover:text-[#3ac8ee] transition-colors">
                Growing Your Business
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
