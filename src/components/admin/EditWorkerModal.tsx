"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { updateWorker } from "@/actions/admin";
import { Shield, Mail, Save } from "lucide-react";
import Button from "../ui/Button";

interface EditWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: any;
  onSuccess: () => void;
}

export function EditWorkerModal({ isOpen, onClose, worker, onSuccess }: EditWorkerModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (worker) {
      setFormData({
        username: worker.username || "",
        email: worker.email || "",
        password: "",
      });
    }
  }, [worker]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await updateWorker(worker.id, formData);
      if (result.success) {
        onSuccess();
        onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Worker Details" className="max-w-md bg-white">
      <form onSubmit={handleSubmit} className="md:p-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Username
            </label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="pl-12"
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
                className="pl-12"
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
                className="pl-12"
                minLength={6}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex gap-3">
          <Button type="button" variant="secondary-outline" onClick={onClose} >
            Cancel
          </Button>
          <Button type="submit" variant="secondary" isLoading={loading} >
            <span>Save Changes</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
