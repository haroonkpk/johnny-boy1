"use client";

import { useState, useEffect } from "react"; 
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
  LogIn,
} from "lucide-react"; 

import Button from "../ui/Button";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
   const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Local series", href: "/localseries", icon: Package },
    { name: "Regular Series", href: "/regularseries", icon: Package },
    { name: "Review", href: "/review", icon: Package },
    { name: "Orders", href: "/cart", icon: ShoppingCart },
    { name: "Contact", href: "/contact", icon: Package },
    // { name: "Admin", href: "/admin", icon: Settings },
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
    <nav className="sticky top-0 z-[100] w-full glass">
      <div className="max-w-[1600px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <div className="flex items-center justify-between h-[clamp(4rem,8vh,5.5rem)]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/jhonny.png"
                alt="Logo"
                className="h-[clamp(2.5rem,4vw,3.5rem)] w-auto rounded-full object-contain"
              />
            </Link>
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
          {/* Desktop Links */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-[clamp(0.25rem,1vw,1.5rem)]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-[clamp(0.5rem,1vw,1rem)] py-[clamp(0.25rem,0.5vw,0.5rem)] rounded-md text-[clamp(0.8rem,0.9vw,1rem)] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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

          <div className="hidden lg:block ml-2">
            <Button
              variant={"primary-outline"}
              className="border-none rounded-lg"
              onClick={() => router.push("/login")}
            >
              <LogIn size={18} />
            </Button>
          </div>

          {/* Mobile menu button (Only Visible on Mobile) */}
          <div className="lg:hidden flex items-center">
            <Button 
              variant={"primary-outline"} 
              onClick={toggleMenu}
              className="p-2 border-none hover:bg-white/10"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Logic) */}
      <div 
        className={`lg:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[calc(100vh-4rem)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-3">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-4 px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white translate-x-2"
                    : "text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-2"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={`p-2 rounded-lg ${isActive ? "bg-white/10" : "bg-white/5"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/5">
            <Button
              variant={"primary"}
              className="w-full justify-center py-4 text-lg"
              onClick={() => {
                setIsOpen(false);
                router.push("/login");
              }}
            >
              <LogIn size={20} className="mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
