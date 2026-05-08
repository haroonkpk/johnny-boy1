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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [monthlySales, setMonthlySales] = useState("");
  const [website, setWebsite] = useState("");
  const [intro, setIntro] = useState("");
  const [terms, setTerms] = useState(false);

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

    if (!terms) {
      setError("You must accept Terms of Use");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/users", {
        firstName,
        lastName,
        email,
        phone,
        password,
        businessName,
        storeAddress,
        monthlySales,
        website,
        intro,
      });

      setCredentials({
        user: data.user,
        token: data.token,
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <p className="text-center text-sm text-gray-600 mb-6">
        Or{" "}
        <button
          onClick={onLoginClick}
          className="font-medium text-black hover:underline"
        >
          sign in to existing account
        </button>
      </p>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center mb-4">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input label="First Name *" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input label="Last Name *" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone *" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <Input label="User Password *" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input label="Confirm Password *" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <Input label="Business Name *" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          <Input label="Store Address" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} />

          <Input label="Anticipated Monthly Unit Sales *" value={monthlySales} onChange={(e) => setMonthlySales(e.target.value)} />
          <Input label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />

        </div>

        <div>
          <label className="text-sm font-medium">A brief Intro *</label>
          <textarea
            className="w-full border rounded-md p-2 mt-1"
            rows={3}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder="0 characters"
          />
        </div>

        <div className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <p>
            By sending this form you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>

        <Button
          type="submit"
          variant="secondary"
          disabled={loading}
          className="w-full py-2"
        >
          {loading ? "Creating account..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}