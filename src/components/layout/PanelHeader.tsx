"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";

interface PanelHeaderProps {
  title: string;
}

export function PanelHeader({ title }: PanelHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 glass">
      <div className="flex items-center justify-between px-4 md:px-8 h-14">
        {/* Back to Home */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Home</span>
        </button>

        {/* Title */}
        <h1 className="text-sm font-bold text-white uppercase tracking-wider">
          {title}
        </h1>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-red-400 transition-all duration-300 cursor-pointer"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
