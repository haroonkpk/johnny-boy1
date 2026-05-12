import { ReactNode } from "react";
import { PanelHeader } from "@/components/layout/PanelHeader";
import CartDrawer from "@/components/context/CartDrawer";

interface RetailerDashboardLayoutProps {
  children: ReactNode;
}

export default function RetailerDashboardLayout({
  children,
}: RetailerDashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--color-cream)]">
      <PanelHeader title="Retailer Panel" />
      <CartDrawer />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1500px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
