"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  Package,
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  AlertCircle,
} from "lucide-react";

import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { LogoutConfirmModal } from "../shared/LogoutConfirmModal";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isLoggedIn = status === "authenticated" && !!session;
  const userRole = (session?.user as any)?.role;
  const isPending = (session?.user as any)?.status === "pending";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Local series", href: "/localseries", icon: Package },
    { name: "Regular Series", href: "/regularseries", icon: Package },
    { name: "Review", href: "/review", icon: Package },
    { name: "Contact", href: "/contact", icon: Package },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDashboardClick = () => {
    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "retailer") {
      router.push("/retailer");
    } else if (userRole === "worker") {
      router.push("/worker/messages");
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
    <nav className="sticky top-0 z-[100] w-full flex flex-col">
      {/* Pending Approval Banner */}
      <AnimatePresence>
        {isLoggedIn && userRole === "retailer" && isPending && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-yellow-500 text-black overflow-hidden"
          >
            <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
              <AlertCircle size={14} className="flex-shrink-0" />
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                Your account is pending approval. Please wait for admin to approve your account.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full glass">
      <div className="max-w-[1600px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <div className="flex items-center justify-between h-[clamp(4rem,8vh,5.5rem)]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/jhonny.png"
                alt="Logo"
                className="h-[clamp(5rem,5vw,5rem)] w-auto max-w-[60vw] rounded-full object-contain"
              />
            </Link>
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
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

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2 ml-2">
            {isLoggedIn ? (
              <>
                {/* Dashboard Button */}
                <Button
                  variant={"primary-outline"}
                  className="border-none rounded-lg"
                  onClick={handleDashboardClick}
                >
                  <LayoutDashboard size={18} />
                </Button>
                {/* Logout Button */}
                <Button
                  variant={"primary-outline"}
                  className="border-none rounded-lg"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <Button
                variant={"primary-outline"}
                className="border-none rounded-lg"
                onClick={() => router.push("/login")}
              >
                <LogIn size={18} />
              </Button>
            )}
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

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-[calc(100vh-4rem)] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 overflow-hidden"
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
                <div
                  className={`p-2 rounded-lg ${
                    isActive ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/5">
            {isLoggedIn ? (
              <div className="space-y-3">
                {/* Dashboard */}
                <Button
                  variant={"primary"}
                  className="w-full justify-center py-4 text-lg"
                  onClick={() => {
                    setIsOpen(false);
                    handleDashboardClick();
                  }}
                >
                  <LayoutDashboard size={20} className="mr-2" />
                  Dashboard
                </Button>
                {/* Logout */}
                <Button
                  variant={"primary-outline"}
                  className="w-full justify-center py-4 text-lg"
                  onClick={() => {
                    setIsOpen(false);
                    setShowLogoutModal(true);
                  }}
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      </div>
    </nav>

    <LogoutConfirmModal 
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      onConfirm={handleLogout}
    />
    </>
  );
}
