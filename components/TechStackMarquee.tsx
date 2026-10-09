"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Terminal,
  Scan,
  Database,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Flame,
  ArrowRight,
  Wifi,
  Activity,
  FileCheck2,
} from "lucide-react";

const ROW_1 = [
  { icon: Flame, label: "PyTorch 2.4" },
  { icon: Scan, label: "YOLOv8 Edge" },
  { icon: Cpu, label: "ESP32-S3 Dual-Core" },
  { icon: Terminal, label: "FreeRTOS Kernel" },
  { icon: Database, label: "Soil NPK & pH Telemetry" },
  { icon: Layers, label: "OpenCV 4.x Vision" },
  { icon: FileCheck2, label: "Patent Claim 1 Drafting" },
  { icon: Wifi, label: "MQTT TLS Telemetry" },
];

const ROW_2 = [
  { icon: Activity, label: "NDVI Vegetation Index" },
  { icon: Zap, label: "TensorRT Edge Inference" },
  { icon: ShieldCheck, label: "InPASS Prior Art Search" },
  { icon: Sparkles, label: "Multi-Spectral Imaging" },
  { icon: Cpu, label: "Analog Sensor ADC Filtering" },
  { icon: Terminal, label: "Python 3.11 Data Stack" },
  { icon: Flame, label: "Disease Pathology CNNs" },
  { icon: Layers, label: "Google Meet Interactive Room" },
];

export default function TechStackMarquee({ onExploreClick }: { onExploreClick: () => void }) {
  const row1Duplicated = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2Duplicated = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070A12] border-t border-white/5">
      {/* Top Horizon Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      {/* Background Animated Icon Rows */}
      <div className="space-y-4 opacity-40 hover:opacity-60 transition-opacity duration-700 pointer-events-none select-none">
        {/* Row 1 Scrolling Left */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-4 whitespace-nowrap will-change-transform"
          >
            {row1Duplicated.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-gray-400 p-2 shadow-inner"
                >
                  <Icon className="w-6 h-6 text-cyan-400/80 mb-1" />
                  <span className="text-[9px] font-mono text-gray-400 truncate max-w-[50px]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Row 2 Scrolling Right */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-4 whitespace-nowrap will-change-transform"
          >
            {row2Duplicated.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-gray-400 p-2 shadow-inner"
                >
                  <Icon className="w-6 h-6 text-indigo-400/80 mb-1" />
                  <span className="text-[9px] font-mono text-gray-400 truncate max-w-[50px]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Central Floating Call To Action Card (matching Magic UI style!) */}
      <div className="max-w-2xl mx-auto px-4 relative z-10 -mt-24 sm:-mt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-10 text-center glass-panel border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top spotlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Central emblem */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25">
            <Sparkles className="w-7 h-7" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Stop wasting time on toy tutorials.
          </h3>
          <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
            Master real computer vision inference, ESP32 microcontroller telemetry, and patent claim formulation with direct mentor support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-black bg-white hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Explore Active Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-semibold text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              Learn About MetaQuest
            </a>
          </div>

          <div className="mt-6 text-[11px] font-mono text-gray-400">
            Official Live Cohorts Hosted on Google Meet • No Hidden Pre-requisites
          </div>
        </motion.div>
      </div>
    </section>
  );
}
