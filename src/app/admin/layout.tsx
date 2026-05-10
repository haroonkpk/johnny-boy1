import { ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  Store,
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
interface OwnerDashboardLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  {
    label: "Retailers",
    href: "/admin/retailers",
    icon: <Users size={18} />,
  },
];

export default function OwnerDashboardLayout({
  children,
}: OwnerDashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        items={adminNavItems}
      />

      <main className="flex-1 overflow-y-auto pb-10 bg-(--color-page-bg) md:pb-0 md:pl-14">
        <div className="max-w-400 mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
