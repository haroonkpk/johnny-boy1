import { ReactNode } from "react";
import {
  Users,
} from "lucide-react";
import { Sidebar } from "@/components/layout/SidebarTemp";
import { PanelHeader } from "@/components/layout/PanelHeader";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  {
    label: "Retailers",
    href: "/admin/retailers",
    icon: <Users size={18} />,
  },
];

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
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
