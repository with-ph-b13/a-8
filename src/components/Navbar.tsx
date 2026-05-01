"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    router.push("/");
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/animals", label: "All Animals" },
  ];

  return (
    <nav className="bg-green-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">🐐</span>
          <span>QurbaniHat</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-green-200 transition-colors ${pathname === link.href ? "text-green-200 font-semibold" : ""
                }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/my-profile" className="flex items-center gap-2 hover:text-green-200">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-green-300 object-cover"
                />
                <span className="text-sm">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="border border-white hover:bg-white hover:text-green-800 px-4 py-1.5 rounded text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-green-800 hover:bg-green-100 px-4 py-1.5 rounded text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-900 px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-200 py-1"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/my-profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-1.5 rounded text-sm w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="border border-white px-4 py-1.5 rounded text-sm text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-green-800 px-4 py-1.5 rounded text-sm text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
