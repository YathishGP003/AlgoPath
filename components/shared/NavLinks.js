'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NavLinks = ({ user }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "About" },
    { href: user ? "/problems" : "/login", label: "Problems" },
    { href: "/faq", label: "FAQ" }
  ];

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className={`text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm font-medium ${
              (pathname === item.href || 
               (item.label === 'Problems' && (pathname === '/problems' || pathname.startsWith('/problems'))))
                ? 'text-white border-b-2 border-red-500' 
                : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-300 hover:text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 md:hidden">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm font-medium ${
                  (pathname === item.href || 
                   (item.label === 'Dashboard' && (pathname === '/problems' || pathname.startsWith('/problems'))))
                    ? 'text-white bg-gray-800 rounded' 
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavLinks;
