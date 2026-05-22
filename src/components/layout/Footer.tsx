

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { BiCalendar } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaPhone, FaYoutube, FaPaperPlane } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { getSiteContent } from "@/actions/content";

const Footer = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSiteContent();
        console.log("Footer Data Fetched from Server:", data); 
        if (data) {
          setContent(data);
        }
      } catch (error) {
        console.error("Footer Data Fetch Error:", error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Agar load ho raha hai, toh UI ko thoda handle kar sakte hain
  if (loading) return <footer className="bg-[#05070a] py-20"><div className="text-white text-center">Loading...</div></footer>;

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
          <img src="/images/jhonny.png" alt="Logo" className="w-60 h-auto object-contain" />
          <p className="mt-6 text-sm text-white/70 leading-7">
            {content?.footerDesc || "Description not available."}
          </p>
    
          <div className="flex items-center space-x-4 mt-8">
            {content?.footerFacebook && (
              <a href={content.footerFacebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#937ef1] transition-all">
                <FaFacebook className="text-white" />
              </a>
            )}
            {content?.footerYoutube && (
              <a href={content.footerYoutube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-all">
                <FaYoutube className="text-white" />
              </a>
            )}
            {content?.footerInstagram && (
              <a href={content.footerInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all">
                <FaInstagram className="text-white" />
              </a>
            )}
          </div>
        </motion.div>

        {/* 2nd part: Address */}
        <motion.div variants={itemVariants} className="lg:mx-auto">
          <h1 className="text-lg font-bold text-white border-b-2 border-white/20 pb-1 w-fit">Address</h1>
          <div className="mt-8 space-y-4">
            <div className="flex items-start space-x-4 group">
              <FaPaperPlane className="w-5 h-5 text-white mt-1" />
              <p className="text-sm text-white/80">{content?.footerAddress || "Address not set"}</p> 
            </div>
            <div className="flex items-center space-x-4 group">
              <FaPhone className="w-5 h-5 text-white" />
              <p className="text-sm text-white/80">{content?.footerPhone || "Phone not set"}</p>
            </div>
            <div className="flex items-center space-x-4 group">
              <IoMailOpen className="w-5 h-5 text-white" />
              <p className="text-sm text-white/80">{content?.footerEmail || "Email not set"}</p>
            </div>
          </div>
        </motion.div>

        {/* 3rd part: Quick Links */}
        <motion.div variants={itemVariants} className="lg:mx-auto">
          <h1 className="text-lg font-bold text-white border-b-2 border-white/20 pb-1 w-fit mb-6">Quick Links</h1>
          <div className="space-y-3 flex flex-col">
            {[
              { name: "Home", path: "/" },
              { name: "Local Series", path: "/localseries" },
              { name: "Regular Series", path: "/regularseries" },
              { name: "Reviews", path: "/review" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link href={link.path} key={link.name} className="block w-fit">
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <MdKeyboardDoubleArrowRight className="w-5 h-5 text-white group-hover:text-[#3ac8ee]" />
                  <p className="text-sm text-white/80 group-hover:text-[#3ac8ee]">{link.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* 4th part: Latest News */}
        <motion.div variants={itemVariants}>
          <h1 className="text-lg font-bold text-white border-b-2 border-white/20 pb-1 w-fit mb-6">Latest News</h1>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-[#3ac8ee]/50 transition-all group cursor-pointer">
            <div className="mt-3">
              <div className="flex items-center text-white text-xs font-bold">
                <BiCalendar className="mr-1" />
                <span>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
              </div>
              <p className="text-white text-sm font-bold mt-1 group-hover:text-[#3ac8ee]">
                {content?.footerNewsTitle || "No news available."}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;