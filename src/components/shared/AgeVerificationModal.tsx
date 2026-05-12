"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("age-verified");
    if (!isVerified) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleYes = () => {
    localStorage.setItem("age-verified", "true");
    setIsOpen(false);
  };

  const handleNo = () => {
    alert("You must be 19+ to access this website.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white max-w-md w-full rounded-2xl p-6 text-center shadow-2xl text-black"
      >
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex justify-center">
            <img
              src="/images/jhonny.png"
              alt="Logo"
              className="h-20 w-auto rounded-full mx-auto"
            />
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-2">Age Verification</h1>

        <p className="text-black text-sm mb-6">
          To use the JOHNNY BOY website, you must be aged 19 years or over. Please verify your age before entering the site.
        </p>

        <p className="font-semibold mb-4">Are you over 19 years of age?</p>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={handleYes}
            className="bg-black text-white px-6 py-2 rounded-xl hover:opacity-80"
          >
            19+
          </button>

          <Button
            onClick={handleNo}
            className="bg-gray-200 px-6 py-2 rounded-xl hover:bg-gray-300"
          >
            Under 19
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
