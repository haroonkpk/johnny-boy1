"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { createWorker } from "@/actions/admin";
import { X, Plus, Shield, Mail } from "lucide-react";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

interface CreateWorkerFormProps {
  onSuccess: () => void;
}

export function CreateWorkerForm({ onSuccess }: CreateWorkerFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await createWorker(data);
      if (result.success) {
        onSuccess();
        formRef.current?.reset();
        setIsOpen(false);
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
    <Card
      variant="light"
      className={cn(
        "transition-all duration-200 ease-in-out mb-10 mx-auto",
        "w-full max-w-6xl mt-6",
        isOpen
          ? "w-full p-[clamp(1.5rem,3vw,2.5rem)]"
          : "bg-transparent shadow-none w-full p-3 border-none"
      )}
    >
      <div
        className={cn(
          "flex items-start justify-between w-full border-gray-300",
          isOpen ? "mb-[clamp(1.5rem,3vw,2rem)] border-b pb-5" : "border-b-0 pb-0"
        )}
      >
        <div className={cn(isOpen ? "block" : "hidden")}>
          <h2 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-[#111827] mb-1">
            Add New Worker
          </h2>
          <p className="text-[#64748B] text-[clamp(0.875rem,1vw,1rem)]">
            Create a new worker account to manage assigned tasks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex-shrink-0 flex items-center justify-center ml-auto transition-all duration-150 ease-in-out",
            isOpen 
              ? "w-[clamp(3.5rem,10vw,4.5rem)] h-[clamp(2.75rem,6vw,3.25rem)] rounded-md text-black" 
              : "w-[clamp(4.5rem,12vw,5.5rem)] h-[clamp(3.25rem,8vw,4rem)] rounded-md bg-black text-white"
          )}
        >
          {isOpen ? (
            <X className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)]" strokeWidth={2.5} />
          ) : (
            <Plus className="w-[clamp(1.75rem,4vw,2.25rem)] h-[clamp(1.75rem,4vw,2.25rem)]" strokeWidth={2.5} />
          )}
        </button>
      </div>

      <div className={cn(isOpen ? "block" : "hidden")}>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold border border-red-100 flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Username
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input name="username" placeholder="e.g. john_doe" required className="pl-12" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                  <Input name="email" type="email" placeholder="worker@example.com" required className="pl-12" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                <Input name="password" type="password" placeholder="••••••••" required className="pl-12" minLength={6} />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <Button type="submit" variant="secondary" isLoading={loading} className="w-full h-12">
                <Plus size={20} />
                <span>Create Worker Account</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
