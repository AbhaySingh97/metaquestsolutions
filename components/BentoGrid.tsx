"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Terminal,
  Video,
  Cpu,
  Award,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Radio,
  ArrowUpRight,
  ShieldCheck,
  Code2,
} from "lucide-react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

function BentoCard({ children, className = "", glowColor = "rgba(56, 189, 248, 0.15)" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl border border-white/10 bg-[#0C101C]/80 backdrop-blur-xl p-6 sm:p-8 overflow-hidden transition-colors duration-300 hover:border-cyan-500/40 shadow-xl ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          The MetaQuest Advantage
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          What You Experience in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            Every Workshop
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-gray-400 text-base sm:text-lg"
        >
          No boring slide decks or pre-recorded videos. Build real engineering systems
          with live mentor guidance, step-by-step code execution, and working projects.
        </motion.p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Card 1: Large Span (Col 1 & 2 on md/lg) - Interactive Live Code Terminal */}
        <BentoCard
          className="md:col-span-2 min-h-[380px]"
          glowColor="rgba(34, 211, 238, 0.18)"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Live Code & Algorithm Execution</h3>
                <p className="text-xs text-gray-400">Write, test, and debug code live on your screen</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Interactive Lab
            </span>
          </div>

          {/* Code Window Mockup */}
          <div className="mt-2 rounded-xl bg-[#070A12] border border-white/10 p-4 font-mono text-xs text-gray-300 overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-gray-500 text-[11px]">telemetry_pipeline.py</span>
              </div>
              <span className="text-gray-500 text-[10px]">Python 3.11</span>
            </div>
            <pre className="text-gray-400 leading-relaxed">
              <code>
                <span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np{"\n"}
                <span className="text-purple-400">from</span> sklearn.ensemble <span className="text-purple-400">import</span> RandomForestClassifier{"\n"}
                {"\n"}
                <span className="text-gray-500"># Step 1: Read Live Soil Telemetry & Feed ML Model</span>{"\n"}
                features = np.array([[<span className="text-amber-400">90</span>, <span className="text-amber-400">42</span>, <span className="text-amber-400">43</span>, <span className="text-amber-400">24.5</span>, <span className="text-amber-400">6.8</span>]]){"\n"}
                prediction = model.predict(features){"\n"}
                <span className="text-cyan-400">print</span>(<span className="text-emerald-300">f"[OK] Live Recommendation: &#123;prediction[0]&#125; (Conf: 98.4%)"</span>)
              </code>
            </pre>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Complete Jupyter Notebooks
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Curated Real-World Datasets
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Lifetime GitHub Access
            </span>
          </div>
        </BentoCard>

        {/* Card 2: 100% Live on Google Meet */}
        <BentoCard
          className="min-h-[380px]"
          glowColor="rgba(16, 185, 129, 0.18)"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Video className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Google Meet
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">100% Live Mentorship</h3>
            <p className="text-xs text-gray-400 mb-5">
              Direct, two-way interactive sessions with experienced engineers.
            </p>

            {/* Interactive Feature List */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Live Screen Debugging</h4>
                  <p className="text-[11px] text-gray-400">Get errors resolved live when your code fails.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Unscripted Q&A</h4>
                  <p className="text-[11px] text-gray-400">Ask career, architecture, or implementation questions directly.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Lifetime Session Recording</h4>
                  <p className="text-[11px] text-gray-400">Review anytime in HD with timestamped markers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400 font-mono">
            <span>Direct Mentor Interaction</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </BentoCard>

        {/* Card 3: Real Hardware & Sensor Telemetry Pipeline */}
        <BentoCard
          className="min-h-[360px]"
          glowColor="rgba(245, 158, 11, 0.18)"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                IoT + ML Edge
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Hardware & Edge Integration</h3>
            <p className="text-xs text-gray-400 mb-6">
              Connect real sensors, ESP32 microcontrollers, and edge AI pipelines.
            </p>

            {/* Visual Hardware Pipeline Diagram */}
            <div className="relative p-4 rounded-xl bg-[#070A12] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Sensors (NPK / pH)
                </span>
                <span className="text-gray-500">➔</span>
                <span className="text-cyan-400">ESP32 MCU</span>
                <span className="text-gray-500">➔</span>
                <span className="text-emerald-400">Cloud Model</span>
              </div>

              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                <span>Real Telemetry</span>
                <span className="text-emerald-400 font-mono">99.2% Latency &lt; 20ms</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-400">
            Learn firmware writing, JSON payloads, and edge inference.
          </div>
        </BentoCard>

        {/* Card 4: Verified Proof of Completion & GitHub Repos (Col span 2 on md/lg) */}
        <BentoCard
          className="md:col-span-2 min-h-[360px]"
          glowColor="rgba(129, 140, 248, 0.18)"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Verified Certificate & Portfolio Projects</h3>
                <p className="text-xs text-gray-400">Tangible proof of work for your resume and LinkedIn</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verifiable QR
            </span>
          </div>

          {/* Certificate & Deliverables Mockup Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-transparent border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Certificate of Completion
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Includes unique verification hash, instructor signatures, and specific project competencies mastered.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-indigo-300 font-mono">
                <span>Issued by MetaQuest Solutions</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/30 to-transparent border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Ready-to-Deploy Codebase
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Push clean, documented code to your GitHub. Perfect to showcase in technical interviews.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-cyan-300 font-mono">
                <span>Jupyter + ESP32 C++ Snippets</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" />
              Turn learning directly into production-grade portfolio evidence
            </span>
            <span className="text-indigo-400 font-mono">Shareable on LinkedIn & Resume</span>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
