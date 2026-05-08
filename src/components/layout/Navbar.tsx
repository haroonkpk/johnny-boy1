"use client";

import { useState } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Settings, Home, Package, Menu, X } from "lucide-react"; 
import Button from "../ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); 

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/services", icon: Package },
    { name: "Review", href: "/review", icon: Package },
    { name: "Contact", href: "/contact", icon: Package },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Admin", href: "/admin", icon: Settings },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

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
