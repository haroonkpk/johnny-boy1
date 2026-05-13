import { ReactNode } from "react";
import {
  Users,
  Box,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Sidebar } from "@/components/layout/SidebarTemp";
import { PanelHeader } from "@/components/layout/PanelHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  {
    label: "Retailers",
    href: "/admin/retailers",
    icon: <Users size={18} />,
  },
  {
    label: "Workers",
    href: "/admin/workers",
    icon: <Users size={18} />,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: <Box size={18} />,
  },
  {
    label: "Messages",
    href: "/admin/contacts",
    icon: <MessageSquare size={18} />,
  },
  {
    label: "Orders",
    href: "/admin/order",
    icon: <MessageSquare size={18} />,
  },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: <Settings size={18} />,
  },
];

export default async function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-(--color-cream)">
      <Sidebar
        items={adminNavItems}
      />

      <main className="flex-1 overflow-y-auto pb-10 bg-(--color-cream) md:pb-0 md:pl-14">
        <PanelHeader title="Admin Panel" />
        <div className="max-w-400 mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
