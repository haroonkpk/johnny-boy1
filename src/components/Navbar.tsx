"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Settings, Home, Package } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Package },
    { name: 'Contact', href: '/contact', icon: Package },
    { name: 'Project', href: '/project', icon: Package },
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Admin', href: '/admin', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* <div className="flex-shrink-0">
            <Link href="/images/jhonny.jpeg" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              
            </Link>
          </div> */}
          <div className="flex-shrink-0">
  <Link href="/" className="flex items-center">
    {/* Image dikhane ke liye niche wala tag use karein */}
    <img 
      src="/images/jhonny.png" 
      alt="Logo" 
      className="h-20 w-auto rounded-full" 
    />

  </Link>
</div>
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
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Mobile menu button could go here - simplified for scope */}
          <div className="md:hidden flex items-center">
            <span className="text-sm text-gray-400">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
