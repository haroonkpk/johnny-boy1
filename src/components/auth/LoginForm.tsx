"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";

interface LoginFormProps {
  onSuccess?: () => void;
  onSignupClick?: () => void;
}

export function LoginForm({ onSuccess, onSignupClick }: LoginFormProps) {
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
    <div className="p-2">
      <p className="text-center text-sm text-gray-600 mb-8">
        Or{" "}
        <button
          onClick={onSignupClick}
          className="font-medium text-black hover:underline"
        >
          create a new account
        </button>
      </p>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center mb-6">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Email address"
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
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

        <div>
          <Button
            type="submit"
            variant="secondary"
            disabled={loading}
            className="w-full py-2 px-4 text-sm rounded-md shadow-sm disabled:bg-gray-400"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}