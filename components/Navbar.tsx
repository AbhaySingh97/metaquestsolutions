"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Calendar, Users, HelpCircle, ArrowUpRight } from "lucide-react";

export default function Navbar({ onExploreClick }: { onExploreClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Transparent Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#workshops"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-cyan-400/80" />
              Workshops
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-emerald-400/80" />
              About Us
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-400/80" />
              FAQs
            </a>
          </nav>

          {/* Action Button (No Admin Button) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onExploreClick}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <span>Upcoming Batches</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
