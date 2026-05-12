"use client";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import { LogOut } from "lucide-react";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Logout"
      className="max-w-md"
    >
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogOut size={32} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Are you sure you want to logout?
        </h3>
        <p className="text-gray-500 mb-8 font-medium">
          You will need to login again to access your dashboard and products.
        </p>

        <div className="flex gap-4">
          <Button
            variant="secondary-outline"
            className="flex-1 font-bold uppercase tracking-widest text-xs"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1 bg-red-600! hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
}
