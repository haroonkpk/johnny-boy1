"use client";

import Sidebar from "../Sidebar/page";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">
      <Sidebar active={active} setActive={setActive} />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}