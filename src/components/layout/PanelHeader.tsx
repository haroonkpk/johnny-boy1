"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, LogOut, ShoppingCart, AlertCircle, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface PanelHeaderProps {
  title: string;
  isPendingApproval?: boolean;
}

import { LogoutConfirmModal } from "../shared/LogoutConfirmModal";

export function PanelHeader({
  title,
  isPendingApproval = false,
}: PanelHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, openDrawer } = useCart();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const isRetailer = pathname.startsWith("/retailer");

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
    <div className="sticky top-0 z-40 flex flex-col w-full">
      <div className="bg-slate-950/50 backdrop-blur-lg w-full border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-8 h-14">
          {/* Back to Home */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </button>

          {/* Title */}
          <h1 className="text-sm font-bold text-white uppercase tracking-wider">
            {title}
          </h1>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {isRetailer && (
              <button
                onClick={openDrawer}
                className="relative p-2 rounded-md text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 bg-red-600 text-[10px] h-4 w-4 rounded-full flex items-center justify-center text-white font-bold border border-black"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* Logout */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-red-400 transition-all duration-300 cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pending Approval Banner */}
      <AnimatePresence>
        {isRetailer && isPendingApproval && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-yellow-500/10 border-b border-yellow-500/20 backdrop-blur-md overflow-hidden"
          >
            <div className="max-w-[1500px] mx-auto px-4 py-2 flex items-center justify-center gap-3 text-center">
              <AlertCircle size={16} className="text-yellow-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-yellow-500 tracking-wide uppercase">
                Your account is pending approval. Please wait for admin to approve your account.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <LogoutConfirmModal 
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      onConfirm={handleLogout}
    />
    </>
  );
}
