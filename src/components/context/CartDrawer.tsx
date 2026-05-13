
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/context/CartContext";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";

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
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  // Total price calculation
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ---  Checkout Function ---
  // --- Updated Checkout Logic --- 
  const handleCheckout = async () => {
    // 1. Basic Check: Agar cart khali hai toh ruk jao
    if (cart.length === 0) return;

    setIsLoading(true);
    
    try {
      // 2. Data Tayyar Karein: Jo Model mang raha hai
   const orderPayload = {
        customerName: session?.user?.name || "Guest Customer",
        email: session?.user?.email || "No Email",
        userId: (session?.user as any)?.id,
        items: cart.map((item: any) => ({ //  'item: any'
          productId: item._id || item.id, 
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalPrice: totalPrice,
        status: 'pending'
      };

      // 3. DATABASE ACTION: Ye orders table mein data save karega
      const dbResponse = await createOrder(orderPayload);

      if (!dbResponse.success) {
        throw new Error("Database Error: " + dbResponse.error);
      }

      // 4. EMAIL API: Database save hone ke baad email bhej rahe hain
      const emailResponse = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orderPayload.customerName, 
          email: orderPayload.email,   
          userId: orderPayload.userId,
          cartItems: cart,
          totalPrice: totalPrice.toFixed(2),
        }),
      });

      // 5. SUCCESS: Cart saaf karein aur user ko batayein
      if (emailResponse.ok) {
        alert("Order Successful! Admin panel updated and Email sent.");
        clearCart();  
        closeDrawer(); 
      } else {
        // Agar email fail ho par DB save ho gaya ho
        alert("Order Recorded! Our team will contact you.");
        clearCart();
        closeDrawer();
      }

    } catch (error: any) {
      console.error("CHECKOUT_ERROR:", error);
      alert(`Order Failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }; 
  // const handleCheckout = async () => {
  //   if (cart.length === 0) return;

  //   setIsLoading(true);
    
  //   try {
  //     const response = await fetch("/api/send-mail", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: session?.user?.name || "Guest Customer", 
  //         email: session?.user?.email || "No Email",   
  //         userId: (session?.user as any)?.id,
  //         cartItems: cart,
  //         totalPrice: totalPrice.toFixed(2),
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert(" Order Sent! Our team will contact you within 24 hours.");
  //       clearCart();  
  //       closeDrawer(); 
  //     } else {
  //       throw new Error(data.error || "Failed to process order");
  //     }
  //   } catch (error: any) {
  //     console.error("CHECKOUT_ERROR:", error);
  //     alert(` Error: ${error.message || "Something went wrong. Please check console."}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-[var(--color-cream)] z-[101] flex flex-col"
          >
            {/* HEADER */}
            <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-(--gold) flex items-center justify-center text-white  ">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="font-black  text-(--gold) tracking-tighter text-2xl uppercase">
                  Cart ({cart.length})
                </h2>
              </div>
              <button 
                onClick={closeDrawer} 
                className="p-2 hover:bg-black/5 rounded-xl transition-all active:scale-90 text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* PRODUCT LIST */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
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
                    className="flex gap-4 p-4 bg-white rounded-2xl group"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 bg-[var(--color-cream)] rounded-xl overflow-hidden flex-shrink-0">
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
                          <h4 className="font-black uppercase text-[13px] leading-tight flex-grow text-zinc-900">
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-zinc-900 font-black text-sm mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-[var(--color-cream)] rounded-lg px-2 py-1 gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="p-1 text-zinc-500 hover:text-black transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-black text-xs w-4 text-center text-zinc-900">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="p-1 text-zinc-500 hover:text-black transition-colors"
                            disabled={isLoading}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="p-8 bg-white/80 backdrop-blur-md space-y-6">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Total Order Value
                    </span>
                    <span className="text-4xl font-black tracking-tighter text-zinc-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  variant="secondary"
                  className="w-full py-6 rounded-2xl text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 border-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending Inquiry...
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Send Order Inquiry
                    </>
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