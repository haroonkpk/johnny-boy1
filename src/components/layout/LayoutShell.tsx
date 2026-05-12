"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AgeVerificationModal } from "@/components/shared/AgeVerificationModal";

const PANEL_PREFIXES = ["/admin", "/retailer"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPanel = PANEL_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isPanel) {
    return (
      <>
        <AgeVerificationModal />
        {children}
      </>
    );
  }

  return (
    <>
      <AgeVerificationModal />
      <Navbar />
      <main className="flex-grow">
        {children}
        <Footer />
      </main>
    </>
  );
}
