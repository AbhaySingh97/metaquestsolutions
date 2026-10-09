"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { Video, Clock, MessageSquareCode, Award, ShieldCheck, Sparkles } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ value, suffix = "", prefix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  const springValue = useSpring(0, {
    stiffness: 70,
    damping: 18,
  });

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="font-mono font-extrabold tracking-tight">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    prefix: "",
    numeric: 100,
    suffix: "%",
    label: "Live Google Meet",
    detail: "Direct screen sharing & unscripted live debugging",
    icon: Video,
    color: "from-cyan-500 to-blue-500",
  },
  {
    prefix: "",
    numeric: 3,
    suffix: "+ Hours",
    label: "Hands-on Live Coding",
    detail: "Build a production ML & IoT project step-by-step",
    icon: Clock,
    color: "from-emerald-400 to-teal-500",
  },
  {
    prefix: "",
    numeric: 100,
    suffix: "%",
    label: "Reusable Deliverables",
    detail: "Jupyter notebooks, ESP32 code & sample datasets",
    icon: MessageSquareCode,
    color: "from-amber-400 to-orange-500",
  },
  {
    prefix: "",
    numeric: 100,
    suffix: "%",
    label: "Verified Proof of Work",
    detail: "Authenticated digital certificate with QR code",
    icon: Award,
    color: "from-indigo-400 to-purple-500",
  },
];

export default function AnimatedStatsBar() {
  return (
    <section className="relative py-12 border-y border-white/5 bg-[#090D18]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                    Pillar 0{idx + 1}
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Big Number */}
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <AnimatedCounter
                      value={stat.numeric}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-200 mt-1">
                    {stat.label}
                  </div>
                </div>

                {/* Detail */}
                <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-white/5">
                  {stat.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
