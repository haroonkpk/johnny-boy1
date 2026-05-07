"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";

interface SignupFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

export function SignupForm({ onSuccess, onLoginClick }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setCredentials = useAuthStore((state) => state.setCredentials);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/users", {
        name,
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
        err.response?.data?.message || "Error creating account"
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
          onClick={onLoginClick}
          className="font-medium text-black hover:underline"
        >
          sign in to existing account
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
            label="Full Name"
            id="signup-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />

          <Input
            label="Email address"
            id="signup-email"
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
            id="signup-password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            id="signup-confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="secondary"
            disabled={loading}
            className="w-full py-2 px-4 text-sm rounded-md shadow-sm disabled:bg-gray-400"
          >
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </div>
      </form>
    </div>
  );
}