"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userID = session?.user?._id;

  // Get user initials from name or email
  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (session?.user?.email) {
      return session.user.email.split("@")[0].slice(0, 2).toUpperCase();
    }
    return "GP"; // Default initials
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="h-16 bg-[#151515] text-white px-4 lg:px-6 flex items-center justify-between shrink-0">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-red-600 w-10 h-10 rounded-md mr-2">
            <img src="/algologo.png" alt="AlgoPath Logo" className="w-6 h-6" />
          </div>
          <span className="font-semibold text-lg">AlgoPath</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <Link
          href="#ide"
          className="text-sm font-medium hover:text-gray-300 transition-colors"
        >
          About
        </Link>
        <Link
          href="/problems"
          className="text-sm font-medium hover:text-gray-300 transition-colors"
        >
          Problems
        </Link>
        <Link
          href="#faqs"
          className="text-sm font-medium hover:text-gray-300 transition-colors"
        >
          FAQ
        </Link>
      </div>

      {/* Auth Section */}
      <div className="flex items-center">
        {userID ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground relative h-10 w-10 rounded-full p-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
              type="button"
            >
              <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 border-2 border-gray-600">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium">
                  {getUserInitials()}
                </span>
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="font-semibold text-gray-900">
                    {session?.user?.name || session?.user?.email?.split("@")[0]}
                  </div>
                  <div className="text-sm text-gray-500">
                    {session?.user?.email}
                  </div>
                </div>
                <div className="py-2">
                  <Link
                    href="/profile-settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors px-4 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
