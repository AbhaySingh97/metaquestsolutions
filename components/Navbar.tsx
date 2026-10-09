"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Calendar, Users, HelpCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#070A12]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/60"
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
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Workshops</span>
            </a>
            <a
              href="#about"
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>About Us</span>
            </a>
            <a
              href="#faq"
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>FAQs</span>
            </a>
          </nav>

          {/* Action Button (Magic UI Pill Button) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onExploreClick}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs text-black bg-white hover:bg-gray-100 transition-all shadow-lg shadow-cyan-500/10 hover:scale-105 active:scale-95 group"
            >
              <span>Upcoming Batches</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
