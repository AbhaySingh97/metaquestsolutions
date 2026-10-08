"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Clock, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { SiteSettings } from "@/lib/db";
import { Workshop } from "@/data/workshops";

interface HeroProps {
  onExploreClick: () => void;
  settings?: SiteSettings;
  nextWorkshop?: Workshop;
}

export default function Hero({ onExploreClick, settings, nextWorkshop }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const announcement =
    settings?.announcement ||
    "Next Live Cohort Enrolling Now | Live Mentorship + Certificate";
  const headline = settings?.heroHeadline || "Pioneering Tomorrow with";
  const highlight = settings?.heroHighlight || "Deep Tech";
  const subtitle =
    settings?.heroSubtitle ||
    "Bridge academic theory and real-world deployment. Master Precision AI in Agriculture, Autonomous Smart Traffic Systems, GreenBinX IoT, and Patent Novelty Formulation with hands-on researchers.";

  // Calculate target timestamp dynamically from actual scheduled workshop or settings
  const targetTimestamp = settings?.nextCohortDate
    ? new Date(settings.nextCohortDate).getTime()
    : new Date("2026-10-24T10:00:00+05:30").getTime();

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTimestamp - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const workshopScheduleText = nextWorkshop
    ? `${nextWorkshop.date} • ${nextWorkshop.time.split("-")[0].trim()}`
    : "Saturday, Oct 24, 2026 • 10:00 AM IST";

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-cyber-grid">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Live Cohort Status - Clean Modern Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-xs font-mono mb-6 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-semibold uppercase tracking-wider">{announcement}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            {headline}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              {highlight}
            </span>{" "}
            & Research Workshops.
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>Explore Upcoming Workshops</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
            >
              <span>Why MetaQuest Solutions?</span>
            </a>
          </div>

          {/* Live Countdown Card - Dynamically Bound to Next Workshop */}
          <div className="max-w-xl mx-auto rounded-2xl p-6 bg-surface/70 border border-white/10 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Next Live Cohort: {workshopScheduleText}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
                Live Google Meet
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {mounted ? String(timeLeft.days).padStart(2, "0") : "--"}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 font-medium">
                  Days
                </div>
              </div>
              <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {mounted ? String(timeLeft.hours).padStart(2, "0") : "--"}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 font-medium">
                  Hours
                </div>
              </div>
              <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {mounted ? String(timeLeft.minutes).padStart(2, "0") : "--"}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 font-medium">
                  Mins
                </div>
              </div>
              <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                  {mounted ? String(timeLeft.seconds).padStart(2, "0") : "--"}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 font-medium">
                  Secs
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Live Interactive Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Direct Google Form Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Google Meet Live Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
