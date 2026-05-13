"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { updateRetailerProfile } from "@/actions/retailer"; 
import { User, Mail, Save, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function RetailerProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Session se initial data load karna
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Note: Backend action ko wahi format bhejein jo wo expect kar raha hai
      const result = await updateRetailerProfile((session?.user as any).id, formData);
      
      if (result.success) {
        setSuccess("Profile updated successfully!");
        
        // Session refresh taaki navbar/header mein bhi details update ho jayein
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            email: formData.email,
          }
        });
      } else {
        setError(result.error || "Update failed");
      }
    } catch (err: any) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen">
      <SectionHeading 
        title="Account Settings"
        subtitle="Manage your personal information and security."
        badge="PROFILE"
        className="mb-0 p-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card variant="light" className="p-8 md:p-10 shadow-sm border-none rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Profile Avatar Header */}
            <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-100">
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "R"}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{formData.name}</h3>
                <p className="text-gray-500 text-sm">Retailer Account</p>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 transition-all">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm border border-emerald-100 transition-all">
                {success}
              </div>
            )}

            <div className="space-y-6">
              {/* Owner Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Owner Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your name"
                    className="pl-12 h-12 focus-visible:ring-black"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Business Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    required
                    placeholder="name@business.com"
                    className="pl-12 h-12 focus-visible:ring-black"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  New Password (Optional)
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type="password"
                    placeholder="Leave blank to keep current"
                    className="pl-12 h-12 focus-visible:ring-black"
                    minLength={6}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Minimum 6 characters required if changing.</p>
              </div>
            </div>

           
            <Button 
  type="submit" 
  variant="primary" 
  isLoading={loading} 
  style={{ backgroundColor: 'black', color: 'white' }}
  className="w-full h-14 rounded-xl text-base font-bold shadow-md transition-colors"
>
  <Save size={20} className="mr-2" />
  Update Profile Details
</Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}