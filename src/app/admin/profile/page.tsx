"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { updateAdminProfile } from "@/actions/admin";
import { Shield, Mail, Save, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function AdminProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    username: (session?.user as any)?.name || "",
    email: session?.user?.email || "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await updateAdminProfile((session?.user as any).id, formData);
      if (result.success) {
        setSuccess("Profile updated successfully!");
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: formData.username,
            email: formData.email,
          }
        });
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen">
      <SectionHeading 
        title="Admin Profile"
        subtitle="Manage your personal account settings and security."
        badge="SETTINGS"
        className="mb-0 p-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card variant="light" className="p-8 md:p-10 shadow-sm border-none rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-100">
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {formData.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{formData.username}</h3>
                <p className="text-gray-500 text-sm">Administrator</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm border border-emerald-100">
                {success}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="pl-12 h-12"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    required
                    className="pl-12 h-12"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  New Password (Optional)
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type="password"
                    placeholder="Leave blank to keep current"
                    className="pl-12 h-12"
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="secondary" isLoading={loading} className="w-full h-14 rounded-xl text-base font-bold shadow-md">
              <Save size={22} />
              <span>Update Profile Settings</span>
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
