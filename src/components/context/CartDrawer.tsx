
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/context/CartContext";
import Button from "../ui/Button";

export default function CartDrawer() {
  const { 
    cart, 
    isDrawerOpen, 
    closeDrawer, 
    removeFromCart, 
    updateQuantity, 
    totalItems,
    clearCart 
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  // Total price calculation
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- Professional Checkout Function ---
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Customer (Haroon)", // Baad mein isse dynamic input se replace karein
          email: "mrina9035@gmail.com",   // Aapki email jahan order receive hoga
          cartItems: cart,
          totalPrice: totalPrice.toFixed(2),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(" Order Sent! Our team will contact you within 24 hours.");
        clearCart();  
        closeDrawer(); 
      } else {
        throw new Error(data.error || "Failed to process order");
      }
    } catch (error: any) {
      console.error("CHECKOUT_ERROR:", error);
      alert(` Error: ${error.message || "Something went wrong. Please check console."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* 1. BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* 2. SIDEBAR DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* HEADER */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-zinc-900 text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-black" />
                <h2 className="font-black italic tracking-tight text-xl uppercase">
                  Cart ({totalItems})
                </h2>
              </div>
              <Button 
                onClick={closeDrawer} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
              >
                <X size={24} />
              </Button>
            </div>

            {/* PRODUCT LIST */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">
                    Your cart is empty
                  </p>
                  <button 
                    onClick={closeDrawer}
                    className="text-gray-700 font-black text-xs uppercase underline underline-offset-4"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 group border-b border-gray-50 pb-6 last:border-0"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2" 
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-black uppercase text-[13px] leading-tight flex-grow">
                            {item.name}
                          </h4>
                          <Button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-gray-700 transition-colors"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                        <p className="text-black font-black text-sm mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1 gap-4 border border-gray-200/50">
                          <Button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="p-1 hover:text-gray-700 transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="font-black text-xs w-4 text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="p-1 hover:text-gray-700 transition-colors"
                            disabled={isLoading}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-3xl font-black tracking-tighter text-zinc-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading}
               className="w-full !bg-black !text-white py-5 rounded-[1.5rem] font-black text-[11px] tracking-[0.2em] hover:!bg-zinc-900 transition-all active:scale-[0.98] shadow-xl shadow-black/20 uppercase flex items-center justify-center gap-2 border-0"
               >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin " />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}