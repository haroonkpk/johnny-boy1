"use client";

import { useState } from "react"; // State handle karne ke liye
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Settings,
  Home,
  Package,
  Menu,
  X,
  UserPlus,
} from "lucide-react"; // Menu icons
import Button from "../ui/Button";
import Signup from "@/app/signup/page";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Local series", href: "/services", icon: Package },
    { name: "Regular Series", href: "/review", icon: Package },
    { name: "Orde", href: "/cart", icon: ShoppingCart },
    { name: "Contact", href: "/contact", icon: Package },
    { name: "Admin", href: "/admin", icon: Settings },
  ];
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLoginSuccess = () => {
    setActiveModal(null);
    router.refresh();
  };

  const handleSignupSuccess = () => {
    setActiveModal(null);
    router.refresh();
  };
  return (
    <nav className="sticky top-0 z-1000 w-full glass">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/jhonny.png"
                alt="Logo"
                className="h-19 w-auto rounded-full"
              />
            </Link>
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block ml-6">
            <Button
              className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#3ac8ee] to-[#937ef1] text-white font-black"
              onClick={() => router.push("/signup")}
            >
              <UserPlus size={20} /> JOIN NOW
            </Button>
          </div>

          {/* Mobile menu button (Only Visible on Mobile) */}
          <div className="md:hidden flex items-center">
            <Button variant={"primary-outline"} onClick={toggleMenu}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Logic) */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
