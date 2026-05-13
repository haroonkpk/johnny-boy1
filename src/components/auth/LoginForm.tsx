"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

// LOGIN VALIDATION SCHEMA
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSignupClick?: () => void;
}

export default function LoginForm({
  onSuccess,
  onSignupClick,
}: LoginFormProps) {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        // Show the exact error message from the server
        setServerError(result.error);
      } else {
        // Fetch the session to determine role for redirect
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        const role = session?.user?.role;

        if (role === "admin") {
          router.push("/admin");
        } else if (role === "retailer") {
          router.push("/retailer");
        } else if (role === "worker") {
          router.push("/worker/messages");
        } else {
          router.push("/");
        }

        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-cream)] overflow-hidden">
      {/* HERO */}
      <PageHero
        title={
          <>
            Welcome{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Back
            </span>
          </>
        }
        subtitle="Login to your account and continue managing your dashboard."
        badge="Login"
      />

      {/* FORM SECTION */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card
            variant="light"
            className="w-full p-6 sm:p-8 md:p-12 rounded-3xl bg-white"
          >
            {/* HEADING */}
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Sign In
              </h2>

              <p className="text-gray-500 mt-3 text-sm md:text-base">
                Access your account using your email and password.
              </p>

              <p className="text-sm text-gray-600 mt-4">
                Don&apos;t have an account?{" "}
               
                <button
                  type="button"
                  onClick={onSignupClick || (() => (window.location.href = "/signup"))}
                  className="font-semibold text-black hover:underline"
                >
                  Create a new account
                </button>
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
              {/* EMAIL */}
              <div>
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <Input
                  label="Password *"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  error={errors.password?.message}
                />
              </div>

              {/* EXTRA OPTIONS */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                      {...register("rememberMe")}
                    />
                    Remember me
                </label>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                variant="secondary"
                isLoading={isLoading}
                className="w-full h-14 text-base font-semibold rounded-2xl"
              >
                Sign In →
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}