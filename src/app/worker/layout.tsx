import { ReactNode } from "react";
import {
  Users,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import { Sidebar } from "@/components/layout/SidebarTemp";
import { PanelHeader } from "@/components/layout/PanelHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface WorkerDashboardLayoutProps {
  children: ReactNode;
}

const workerNavItems = [
  {
    label: "Messages",
    href: "/worker/messages",
    icon: <MessageSquare size={18} />,
  },
  {
    label: "Retailers",
    href: "/worker/retailers",
    icon: <Users size={18} />,
  },
];

export default async function WorkerDashboardLayout({
  children,
}: WorkerDashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "worker") {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-(--color-cream)">
      <Sidebar
        items={workerNavItems}
      />

      <main className="flex-1 overflow-y-auto pb-10 bg-(--color-cream) md:pb-0 md:pl-14">
        <PanelHeader title="Worker Panel" />
        <div className="max-w-400 mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
