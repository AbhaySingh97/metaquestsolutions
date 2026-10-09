"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Terminal,
  Activity,
  Scan,
  Cpu,
  FileCheck2,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteSettings } from "@/lib/db";
import { Workshop } from "@/data/workshops";

interface HeroProps {
  onExploreClick: () => void;
  settings?: SiteSettings;
  nextWorkshop?: Workshop;
}

export default function Hero({ onExploreClick, settings, nextWorkshop }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<"vision" | "telemetry" | "patent">("vision");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const announcement =
    settings?.announcement ||
    "Registrations Open for Next Workshop • Saturday, Oct 24, 2026";
  const headline = settings?.heroHeadline || "Learn Practical Engineering &";
  const highlight = settings?.heroHighlight || "Applied Tech";
  const subtitle =
    settings?.heroSubtitle ||
    "Learn Applied AI, Embedded IoT, Computer Vision, and Patent Filing through live interactive sessions with real code and hardware.";

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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#070A12]">
      {/* Magic UI Style Top Ambient Radiant Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/15 via-indigo-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Shimmer Pill Badge (Magic UI Style) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white text-xs font-mono transition-all backdrop-blur-md shadow-lg shadow-black/40 hover:scale-105 active:scale-95"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>{announcement}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
            </button>
          </motion.div>

          {/* Main Headline with Framer Motion Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            {headline}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              {highlight}
            </span>{" "}
            & Hands-on Workshops.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {subtitle}
          </motion.p>

          {/* Call to Actions (Magic UI style crisp pill buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14"
          >
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-black bg-white hover:bg-gray-100 transition-all shadow-xl shadow-cyan-500/10 hover:scale-105 active:scale-95 group"
            >
              <span>Explore Upcoming Workshops</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-gray-200 bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
            >
              <span>Why MetaQuest Solutions?</span>
            </a>
          </motion.div>

          {/* HERO WORKBENCH / APP FRAME PREVIEW (Replicating Magic UI App Showcase) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto rounded-2xl bg-zinc-950/90 border border-white/10 shadow-2xl shadow-black/80 overflow-hidden relative backdrop-blur-xl text-left"
          >
            {/* Window Bezel Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-gray-400 ml-2 hidden sm:inline-block">
                  metaquest-studio // v2.4 (YOLOv8 Edge & ESP32 FreeRTOS)
                </span>
              </div>

              {/* Integrated Live Dynamic Countdown Timer in Window Header */}
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-mono text-gray-400 uppercase hidden sm:inline">
                  Next Workshop Starts In:
                </span>
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  {mounted
                    ? `${String(timeLeft.days).padStart(2, "0")}d : ${String(timeLeft.hours).padStart(2, "0")}h : ${String(timeLeft.minutes).padStart(2, "0")}m : ${String(timeLeft.seconds).padStart(2, "0")}s`
                    : "-- : -- : -- : --"}
                </span>
              </div>
            </div>

            {/* Workbench Navigation Tabs */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black/40 text-xs">
              <div className="flex items-center gap-1 overflow-x-auto">
                {[
                  { id: "vision", label: "Edge AI & Vision", icon: Scan },
                  { id: "telemetry", label: "Embedded IoT Telemetry", icon: Cpu },
                  { id: "patent", label: "Patent Drafting & Research", icon: FileCheck2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activePreviewTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActivePreviewTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                        isActive
                          ? "bg-white/10 text-cyan-300 font-semibold"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>30 FPS Edge Inference</span>
              </div>
            </div>

            {/* Workbench Main Content Display with Framer Motion AnimatePresence */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-[#0B0F19] to-black min-h-[260px]">
              <AnimatePresence mode="wait">
                {activePreviewTab === "vision" && (
                  <motion.div
                    key="vision"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                  >
                    {/* Simulated Camera Feed */}
                    <div className="md:col-span-7 rounded-xl bg-black/70 border border-white/10 p-4 relative min-h-[190px] flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-b border-white/5 pb-2">
                        <span className="text-cyan-400 font-bold">FEED: OPTICAL_EDGE_STREAM_01</span>
                        <span>RES: 1280x720 • PyTorch</span>
                      </div>

                      {/* Interactive Bounding Box */}
                      <div className="my-3 relative p-4 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold mb-1">
                            <span>[0] Autonomous Target Tracking: 98.7% Conf</span>
                          </div>
                          <div className="text-[11px] text-gray-300">
                            Spatial Tracking: Bounding Box Coordinates [x: 342, y: 198, w: 240, h: 180]
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300">
                          <Activity className="w-5 h-5 animate-pulse" />
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-gray-500 flex items-center justify-between">
                        <span>Latency: 14.2ms (Edge NPU Quantized)</span>
                        <span className="text-emerald-400">STATUS: INFERENCE NOMINAL</span>
                      </div>
                    </div>

                    {/* Diagnostics Metrics */}
                    <div className="md:col-span-5 space-y-2 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] text-gray-400 uppercase">Model Architecture</div>
                        <div className="text-white font-bold text-sm">YOLOv8 Nano Custom Head</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] text-gray-400 uppercase">Quantization & Export</div>
                        <div className="text-cyan-300 font-bold text-sm">INT8 TensorRT & ONNX Runtime</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] text-gray-400 uppercase">Target Deployment</div>
                        <div className="text-emerald-400 font-bold text-sm">ESP32-S3 / Jetson / Edge NPU</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePreviewTab === "telemetry" && (
                  <motion.div
                    key="telemetry"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-mono"
                  >
                    {[
                      { label: "Sensor ADC Stream", value: "3.28 V", status: "12-bit ADC Nominal", color: "text-cyan-400" },
                      { label: "Bus Protocol", value: "I2C / SPI", status: "400 kHz Fast-Mode", color: "text-emerald-400" },
                      { label: "FreeRTOS Kernel", value: "Priority 2", status: "Non-Blocking ISR", color: "text-amber-400" },
                      { label: "MQTT TLS Broker", value: "Port 8883", status: "TLS 1.3 Online", color: "text-indigo-400" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] text-gray-400 block uppercase">{item.label}</span>
                        <div className={`text-xl font-bold my-1 ${item.color}`}>{item.value}</div>
                        <span className="text-[10px] text-gray-400">{item.status}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activePreviewTab === "patent" && (
                  <motion.div
                    key="patent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 text-xs font-mono"
                  >
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-cyan-400 font-bold block mb-1">
                        [CLAIM 1] Independent Novelty Formulation:
                      </span>
                      <p className="text-gray-300 text-[11px] leading-relaxed">
                        A cyber-physical edge computing architecture configured to execute real-time low-latency multi-modal sensor fusion with deterministic hardware interrupt handling and provable differential novel claims over prior art.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

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
              <span>Official Google Meet Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
