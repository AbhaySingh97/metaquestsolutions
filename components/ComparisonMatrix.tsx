"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

interface ComparisonRow {
  dimension: string;
  traditional: string;
  metaquest: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: "Session Format",
    traditional: "Pre-recorded videos with passive watching",
    metaquest: "100% Live, interactive Google Meet with screen sharing",
  },
  {
    dimension: "When Your Code Breaks",
    traditional: "Stuck for hours reading outdated forum posts",
    metaquest: "Live screen debugging directly with mentors during the session",
  },
  {
    dimension: "Datasets & Code Quality",
    traditional: "Synthetic toy datasets and copy-pasted tutorial code",
    metaquest: "Clean real-world telemetry, production models, and modular Python/C++",
  },
  {
    dimension: "Hardware & Edge Systems",
    traditional: "Abstract theoretical slides without any physical devices",
    metaquest: "Real ESP32 microcontrollers, live sensor data, and IoT pipelines",
  },
  {
    dimension: "Deliverables & Portfolio",
    traditional: "Basic attendance badge without any GitHub proof",
    metaquest: "Working repository on your GitHub + Verified Completion Certificate",
  },
  {
    dimension: "Interaction & Q&A",
    traditional: "Static comment section with delayed or automated replies",
    metaquest: "Direct real-time conversation and unscripted technical Q&A",
  },
];

export default function ComparisonMatrix() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-600/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4"
        >
          <Zap className="w-3.5 h-3.5" />
          The Difference
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          Why Engineers Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            MetaQuest Workshops
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-400 text-base sm:text-lg"
        >
          How our live hands-on sessions contrast with generic pre-recorded courses and
          theory-heavy college lectures.
        </motion.p>
      </div>

      {/* Comparison Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 bg-white/[0.02]">
          <div className="md:col-span-4 p-5 sm:p-6 text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Comparison Criteria
          </div>

          <div className="hidden md:flex md:col-span-4 p-5 sm:p-6 text-xs font-mono font-semibold uppercase tracking-wider text-rose-400/90 items-center gap-2 border-l border-white/5 bg-rose-500/[0.02]">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Generic Pre-Recorded Courses
          </div>

          <div className="md:col-span-4 p-5 sm:p-6 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 flex items-center justify-between border-l border-white/5 bg-cyan-500/[0.05]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              MetaQuest Live Workshop
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
              Live & Hands-on
            </span>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {COMPARISON_DATA.map((row, idx) => (
            <motion.div
              key={row.dimension}
              onMouseEnter={() => setHoveredRow(idx)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`grid grid-cols-1 md:grid-cols-12 transition-colors duration-200 ${
                hoveredRow === idx ? "bg-white/[0.03]" : ""
              }`}
            >
              {/* Criteria Label */}
              <div className="md:col-span-4 p-5 sm:p-6 flex items-center">
                <span className="text-sm font-semibold text-white">
                  {row.dimension}
                </span>
              </div>

              {/* Traditional / Generic */}
              <div className="md:col-span-4 p-5 sm:p-6 border-l border-white/5 flex items-start gap-3 bg-rose-500/[0.01]">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  {row.traditional}
                </span>
              </div>

              {/* MetaQuest Advantage */}
              <div className="md:col-span-4 p-5 sm:p-6 border-l border-white/5 flex items-start gap-3 bg-cyan-500/[0.03]">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-sm text-cyan-100 font-medium leading-relaxed">
                  {row.metaquest}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
