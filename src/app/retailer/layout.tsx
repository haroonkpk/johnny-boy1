
import { ReactNode } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  User, 
  ShoppingCart 
} from "lucide-react"; 
import { Sidebar } from "@/components/layout/SidebarTemp";
import { PanelHeader } from "@/components/layout/PanelHeader";
import CartDrawer from "@/components/context/CartDrawer";

interface RetailerDashboardLayoutProps {
  children: ReactNode;
}


const retailerNavItems = [
{
    label: "Dashboard",
    href: "/retailer", 
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "My Orders",
    href: "/retailer/orders",
    icon: <Package size={18} />,
  },
  {
    label: "Profile",
    href: "/retailer/profile",
    icon: <User size={18} />,
  },
];

export default function RetailerDashboardLayout({
  children,
}: RetailerDashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-cream)]">
 
      <Sidebar items={retailerNavItems} />

    
      <main className="flex-1 overflow-y-auto pb-10 md:pb-0 md:pl-14">
        <PanelHeader title="Retailer Panel" />
        <CartDrawer />
        
        <div className="max-w-[1500px] mx-auto w-full p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
