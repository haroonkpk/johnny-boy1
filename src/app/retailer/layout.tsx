import { ReactNode } from "react";
import { PanelHeader } from "@/components/layout/PanelHeader";

import { CartProvider } from "@/components/context/CartContext";

interface RetailerDashboardLayoutProps {
  children: ReactNode;
}

export default function RetailerDashboardLayout({
  children,
}: RetailerDashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <PanelHeader title="Retailer Panel" />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full p-6 md:p-10">
          
    
          {/* {children} */}
  <CartProvider>
          {children}
        </CartProvider>
        </div>
      </main>
    </div>
  );
}
