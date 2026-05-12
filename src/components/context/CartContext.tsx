"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// cart sidebar
// 1. Product Type Definition
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 2. Context Interface (clearCart add kar diya gaya hai)
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void; // Checkout ke baad cart khali karne ke liye
  totalItems: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // --- LocalStorage Logic ---
  
  // Mount hone par data load karein
  useEffect(() => {
    const savedCart = localStorage.getItem("jb-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  // Cart change hone par save karein
  useEffect(() => {
    localStorage.setItem("jb-cart", JSON.stringify(cart));
  }, [cart]);

  // --- Handlers ---

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addToCart = (product: any) => {
    const productId = product._id || product.id;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        { 
          id: productId, 
          name: product.name, 
          price: product.price || 15.0, 
          image: product.image, 
          quantity: 1 
        },
      ];
    });
    setIsDrawerOpen(true); 
  };


  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // FIX: Clear Cart Function
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("jb-cart");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        totalItems, 
        isDrawerOpen, 
        openDrawer, 
        closeDrawer 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};