"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Zap, BookOpen, Layers, ShieldCheck, Video, Flame } from "lucide-react";

const PARTNERS = [
  { name: "PyTorch Edge", icon: Flame, tag: "AI Framework" },
  { name: "Espressif ESP32", icon: Cpu, tag: "Firmware" },
  { name: "Google Meet", icon: Video, tag: "Live Cohorts" },
  { name: "IEEE Xplore", icon: BookOpen, tag: "Research Pubs" },
  { name: "OpenCV Vision", icon: Layers, tag: "Computer Vision" },
  { name: "InPASS Registry", icon: ShieldCheck, tag: "Patent Office" },
  { name: "FreeRTOS Kernel", icon: Terminal, tag: "Edge RTOS" },
  { name: "MQTT Broker", icon: Zap, tag: "IoT Telemetry" },
];

export default function LogoMarquee() {
  const duplicated = [...PARTNERS, ...PARTNERS];

  return (
    <div className="py-12 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400">
          Built with Industry-Standard Hardware & Research Tooling
        </p>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative flex overflow-x-hidden mask-gradient">
        {/* Left and right fade gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-6 whitespace-nowrap will-change-transform"
        >
          {duplicated.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all text-gray-400 hover:text-white group"
              >
                <Icon className="w-4 h-4 text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
                <span className="text-xs font-semibold tracking-wide font-sans">{item.name}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-300">
                  {item.tag}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
