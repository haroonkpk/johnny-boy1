"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  onSuccess?: () => void;
  onSignupClick?: () => void;
}

export default function LoginForm({
  onSuccess,
  onSignupClick,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setCredentials = useAuthStore((state) => state.setCredentials);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/users/login", {
        email,
        password,
      });

      setCredentials({
        user: data.user,
        token: data.token,
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
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
            className="w-full p-6 sm:p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl bg-white"
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
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl text-sm text-center mb-8">
                {error}
              </div>
            )}

            {/* FORM */}
            <form className="space-y-7" onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div>
                <Input
                  label="Email Address *"
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <Input
                  label="Password *"
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              {/* EXTRA OPTIONS */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                variant="secondary"
                disabled={loading}
                className="w-full h-14 text-base font-semibold rounded-2xl disabled:bg-gray-400"
              >
                <span>
                  {loading ? "Signing in..." : "Sign In"}
                </span>

                {!loading && (
                  <span className="text-xl ml-2">→</span>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}