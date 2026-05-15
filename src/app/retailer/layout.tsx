import { ReactNode } from "react";
import { 
  Box,
  ShoppingBag, 
} from "lucide-react"; 
import { Sidebar } from "@/components/layout/SidebarTemp";
import { PanelHeader } from "@/components/layout/PanelHeader";
import CartDrawer from "@/components/context/CartDrawer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

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

export default async function RetailerDashboardLayout({
  children,
}: RetailerDashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "retailer") {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-cream)]">
      <Sidebar 
        items={retailerNavItems} 
       
      />

      <main className="flex-1 overflow-y-auto md:pl-14">
        <PanelHeader
          title="Retailer Panel"
          isPendingApproval={(session.user as any).status === "pending"}
        />
        <CartDrawer />
        <div className="max-w-[1500px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
