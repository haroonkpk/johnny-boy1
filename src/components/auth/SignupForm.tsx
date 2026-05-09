"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function SignupForm() {
  const [intro, setIntro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup form submitted");
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-cream)] overflow-hidden">
      {/* HERO */}
      <PageHero
        title={
          <>
            Wholesale{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Signup
            </span>
          </>
        }
        subtitle="Apply for a wholesale account and start ordering with custom pricing."
        badge="Get Started"
      />

      {/* FORM WRAPPER */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full p-6 sm:p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl bg-white">
            
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Create Wholesale Account
              </h2>
              <p className="text-gray-500 mt-3 text-sm md:text-base">
                Fill out the form below to request access to wholesale pricing.
              </p>
             <p className="text-sm text-gray-600 mt-4">
  Already have an account?{" "}
  <Link
    href="/login"
    className="font-semibold text-black hover:underline"
  >
    Login here
  </Link>
</p>
              
            </div >

            {/* FORM */}
            <form className="space-y-7" onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="First Name *" type="text" placeholder="Enter first name" />
                <Input label="Last Name *" type="text" placeholder="Enter last name" />
              </div>

              {/* EMAIL + PHONE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Email Address *" type="email" placeholder="email@example.com" />
                <Input label="Phone *" type="tel" placeholder="+92 300 1234567" />
              </div>

              {/* PASSWORD + BUSINESS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="User Password *" type="password" placeholder="Enter password" />
                <Input label="Business Name *" type="text" placeholder="Your business name" />
              </div>

              {/* ADDRESS */}
              <Input label="Store Address" type="text" placeholder="Enter store address" />

              {/* SALES + WEBSITE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Monthly Unit Sales *" type="number" placeholder="e.g. 500" />
                <Input label="Website" type="url" placeholder="https://yourwebsite.com" />
              </div>

              {/* INTRO */}
              <div>
                <Textarea
                  label="A Brief Intro *"
                  rows={6}
                  placeholder="Tell us about your business..."
                  className="resize-none"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                />

                <p className="text-right text-sm text-gray-400 mt-2">
                  {intro.length} characters
                </p>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4" />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-black">Terms of Use *</span>
                  <br />
                  By sending this form you agree to Privacy Policy and Terms of Service.
                </p>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                variant="secondary"
                className="w-full h-14 text-base font-semibold rounded-2xl"
              >
                Submit →
              </Button>

            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}