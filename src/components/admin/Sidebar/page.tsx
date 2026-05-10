
"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Retailers", icon: Users, path: "/admin/retailersform" },
  { name: "Messages", icon: MessageSquare, path: "/admin/contact" },
];

export default function Sidebar({
  active,
  setActive,
}: {
  active: string;
  setActive: (val: string) => void;
}) {
  const router = useRouter();

  const handleClick = (item: (typeof menu)[0]) => {
    setActive(item.name);
    router.push(item.path);
  };

  return (
    <aside className="w-64 bg-white shadow-lg p-5 hidden md:block h-screen sticky top-0 text-black">
      <h1 className="text-2xl font-bold mb-8 text-gray-600">
        Admin Panel
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
              ${
                active === item.name
                  ? "bg-blue-100 text-black"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}