"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function Header() {
  const { toggleCart, itemCount } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = itemCount();

  const navLinks = [
    { href: "/products", label: "All Fragrances" },
    { href: "/products?category=women", label: "Women" },
    { href: "/products?category=men", label: "Men" },
    { href: "/products?category=unisex", label: "Unisex" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-light tracking-[0.2em] text-stone-900 uppercase">
              Parfum
            </span>
            <span className="w-px h-5 bg-stone-300" />
            <span className="text-xs tracking-[0.3em] text-stone-500 uppercase font-medium">
              Élite
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Search size={20} />
            </button>

            <button
              onClick={toggleCart}
              aria-label="Cart"
              className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-stone-900 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase font-medium py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
