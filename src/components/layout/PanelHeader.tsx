"use client";

import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface PanelHeaderProps {
  title: string;
}

export function PanelHeader({ title }: PanelHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, openDrawer } = useCart();
  
  const isRetailer = pathname.startsWith("/retailer");

  return (
    <div className="sticky top-0 z-40 glass">
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
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-red-400 transition-all duration-300 cursor-pointer"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
