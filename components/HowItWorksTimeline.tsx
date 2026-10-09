"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Compass,
  MailCheck,
  Code,
  Award,
  Video,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Step {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const STEPS: Step[] = [
  {
    step: "01",
    title: "Pick Your Workshop Topic",
    subtitle: "Select from applied AI, IoT, and embedded engineering sessions",
    description:
      "Explore upcoming live workshops designed around real industry problems. Lock in your seat using the straightforward Google Form registration.",
    icon: <Compass className="w-5 h-5 text-cyan-400" />,
    tags: ["No Fluff", "Hands-on Focus", "Instant Registration"],
  },
  {
    step: "02",
    title: "Instant Google Meet Invite & Starter Kit",
    subtitle: "Everything delivered to your inbox before the session",
    description:
      "Receive your Google Meet link, GitHub starter repository, clean datasets, and setup guide in advance so you can hit the ground running.",
    icon: <MailCheck className="w-5 h-5 text-emerald-400" />,
    tags: ["Google Meet Link", "Jupyter Starter Notebooks", "Hardware Schematics"],
  },
  {
    step: "03",
    title: "Build Live With Mentors",
    subtitle: "3 hours of guided interactive coding and hardware telemetry",
    description:
      "Join the live session with mentors Abhay, Anant, and Anamika. Code along step-by-step, screen-share to debug errors in real-time, and ask questions freely.",
    icon: <Code className="w-5 h-5 text-amber-400" />,
    tags: ["Live Screen Debugging", "Direct Q&A", "Real Hardware Telemetry"],
  },
  {
    step: "04",
    title: "Deploy Working Code & Earn Certificate",
    subtitle: "Permanent project assets for your resume and portfolio",
    description:
      "Walk away with working code deployed to your own GitHub, full session recordings for replay, and an authenticated MetaQuest Certificate of Completion.",
    icon: <Award className="w-5 h-5 text-indigo-400" />,
    tags: ["Verified Certificate", "GitHub Portfolio Project", "Lifetime Recording"],
  },
];

export default function HowItWorksTimeline({ onExploreClick }: { onExploreClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Workshop Journey
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          How It Works in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            4 Simple Steps
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-400 text-base sm:text-lg"
        >
          From reserving your seat to pushing your finished project to GitHub — here is
          what your live workshop experience looks like.
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Animated Vertical Line for Desktop & Tablet */}
        <div className="hidden sm:block absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/10">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-cyan-400 via-emerald-400 to-indigo-500 origin-top shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          />
        </div>

        {/* Steps */}
        <div className="space-y-12 sm:space-y-16">
          {STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-6 md:gap-12`}
              >
                {/* Center Node / Number Badge */}
                <div className="sm:absolute sm:left-8 md:left-1/2 -translate-x-0 sm:-translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] border-2 border-cyan-500/50 flex items-center justify-center text-sm font-bold font-mono text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    {step.step}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} pl-0 sm:pl-16 md:pl-0`}>
                  <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0C101C]/80 backdrop-blur-xl shadow-xl hover:border-cyan-500/30 transition-all duration-300 group">
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                        {step.icon}
                      </div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                        Phase {step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-400 mt-1 mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Tag Pills */}
                    <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-gray-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      {onExploreClick && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            Explore Active Workshops
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
