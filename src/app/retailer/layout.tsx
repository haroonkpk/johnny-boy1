
import { ReactNode } from "react";
import { 
  Box,
  ShoppingBag, 
} from "lucide-react"; 
import { Sidebar } from "@/components/layout/SidebarTemp";
import { PanelHeader } from "@/components/layout/PanelHeader";
import CartDrawer from "@/components/context/CartDrawer";

interface RetailerDashboardLayoutProps {
  children: ReactNode;
}

const retailerNavItems = [
  {
    label: "Products",
    href: "/retailer",
    icon: <Box size={18} />,
    exact: true,
  },
  {
    label: "My Orders",
    href: "/retailer/orders",
    icon: <ShoppingBag size={18} />,
  },
];

export default function RetailerDashboardLayout({
  children,
}: RetailerDashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-cream)]">
      <Sidebar 
        items={retailerNavItems} 
       
      />

      <main className="flex-1 overflow-y-auto md:pl-14">
        <PanelHeader title="Retailer Panel" />
        <CartDrawer />
        <div className="max-w-[1500px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
