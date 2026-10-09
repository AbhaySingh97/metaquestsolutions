"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, X, Clock, Video } from "lucide-react";
import { Workshop } from "@/data/workshops";
import { SiteSettings } from "@/lib/db";

interface FloatingDockProps {
  workshop?: Workshop;
  settings?: SiteSettings;
  onRegisterClick?: (workshop: Workshop) => void;
}

export default function FloatingRegisterDock({
  workshop,
  settings,
  onRegisterClick,
}: FloatingDockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Scroll listener to show dock after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live timer calculation matching nextCohortDate
  const targetDateStr = settings?.nextCohortDate || "2026-10-24T10:00:00+05:30";

  useEffect(() => {
    const targetTimestamp = new Date(targetDateStr).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  if (!workshop || isDismissed) return null;

  const handleAction = () => {
    if (onRegisterClick) {
      onRegisterClick(workshop);
    } else if (workshop.googleFormUrl) {
      window.open(workshop.googleFormUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-5 inset-x-0 z-40 px-4 pointer-events-none flex justify-center"
        >
          <div className="pointer-events-auto max-w-4xl w-full rounded-2xl border border-cyan-500/30 bg-[#0B0F19]/95 backdrop-blur-2xl p-3 sm:px-5 sm:py-3 shadow-2xl shadow-cyan-500/10 flex items-center justify-between gap-4">
            {/* Workshop Quick Info */}
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="hidden sm:flex p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                    Next Live Session
                  </span>
                  <span className="hidden md:inline-block text-[11px] text-gray-500">
                    • {workshop.date}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {workshop.title}
                </h4>
              </div>
            </div>

            {/* Countdown mini pill (hidden on very small screens) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5 font-mono text-xs text-gray-300 shrink-0">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Starts in:</span>
              <span className="font-bold text-white">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>

            {/* Register CTA Button + Price */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex flex-col text-right pr-2">
                <span className="text-[10px] text-gray-400 line-through">
                  ₹{workshop.originalPrice}
                </span>
                <span className="text-xs font-bold font-mono text-emerald-400">
                  ₹{workshop.discountedPrice}
                </span>
              </div>

              <button
                onClick={handleAction}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-95 whitespace-nowrap"
              >
                <span>Register</span>
                <span className="hidden sm:inline">via Google Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsDismissed(true)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
