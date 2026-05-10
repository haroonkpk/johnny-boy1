"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { signupAction } from "@/actions/auth";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  businessName: z.string().min(2, "Business name is required"),
  storeAddress: z.string().optional(),
  monthlySales: z
    .string()
    .min(1, "Monthly sales is required")
    .regex(/^\d+$/, "Please enter a valid number"),
  website: z.string().url("Invalid URL (e.g. https://example.com)").optional().or(z.literal("")),
  intro: z.string().min(20, "Please provide a brief intro (min 20 characters)"),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms of use"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      businessName: "",
      storeAddress: "",
      monthlySales: "",
      website: "",
      intro: "",
      terms: false,
    },
  });

  const introValue = watch("intro") || "";

  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setServerError("");
    
    try {
      // Map form data to model fields
      const formattedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        businessName: data.businessName,
        storeAddress: data.storeAddress,
        monthlyUnitSales: data.monthlySales,
        website: data.website,
        briefIntro: data.intro,
      };

      const result = await signupAction(formattedData);

      if (result?.error) {
        setServerError(result.error);
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-4">
        <div
          className="max-w-md w-full"
        >
          <Card className="bg-white p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-black">Application Received!</h2>
            <p className="text-gray-600">
              Thank you for applying for a wholesale account. Our team will review your application and get back to you within 24-48 hours.
            </p>
            <Link href="/" className="block">
              <Button variant="secondary" className="w-full">
                Back to Home
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

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
        <div>
          <Card className="bg-white p-8 md:p-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Create Wholesale Account
              </h2>
              <p className="text-gray-500 mt-3 text-sm md:text-base">
                Fill out the form below to request access to wholesale pricing.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-black hover:underline">
                  Login here
                </Link>
              </p>
            </div>

            {/* ERROR */}
            {serverError && (
              <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl text-sm text-center mb-8">
                {serverError}
              </div>
            )}

            {/* FORM */}
            <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
              {/* NAME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name *"
                  placeholder="Enter first name"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last Name *"
                  placeholder="Enter last name"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>

              {/* EMAIL + PHONE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                />
                <Input
                  label="Phone *"
                  type="tel"
                  placeholder="+92 300 1234567"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </div>

              {/* PASSWORD + BUSINESS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="User Password *"
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                  error={errors.password?.message}
                />
                <Input
                  label="Business Name *"
                  placeholder="Your business name"
                  {...register("businessName")}
                  error={errors.businessName?.message}
                />
              </div>

              {/* ADDRESS */}
              <Input
                label="Store Address"
                placeholder="Enter store address"
                {...register("storeAddress")}
                error={errors.storeAddress?.message}
              />

              {/* SALES + WEBSITE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Monthly Unit Sales *"
                  type="number"
                  placeholder="e.g. 500"
                  {...register("monthlySales")}
                  error={errors.monthlySales?.message}
                />
                <Input
                  label="Website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  {...register("website")}
                  error={errors.website?.message}
                />
              </div>

              {/* INTRO */}
              <div>
                <Textarea
                  label="A Brief Intro *"
                  rows={6}
                  placeholder="Tell us about your business..."
                  className="resize-none"
                  {...register("intro")}
                  error={errors.intro?.message}
                />

                <p className="text-right text-sm text-gray-400 mt-2">
                  {introValue.length} characters
                </p>
              </div>

              {/* TERMS */}
              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className={`mt-1 w-4 h-4 cursor-pointer accent-black ${errors.terms ? 'outline outline-2 outline-red-500' : ''}`}
                    {...register("terms")}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    <span className="font-semibold text-black">Terms of Use *</span>
                    <br />
                    By sending this form you agree to Privacy Policy and Terms of Service.
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-500 font-medium ml-7 mt-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                variant="secondary"
                className="w-full h-14 text-base font-semibold rounded-2xl"
                isLoading={isSubmitting}
              >
                Submit Application →
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}