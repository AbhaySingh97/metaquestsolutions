"use client";

import { Cpu, Lightbulb, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const pillars = [
    {
      icon: Cpu,
      title: "Real Hardware & Edge Telemetry",
      description:
        "We reject purely simulated sandbox tutorials. Every IoT and robotics curriculum interfaces with live microcontrollers, ESP32 nodes, optical sensors, and edge accelerators.",
    },
    {
      icon: FileText,
      title: "Patent-Grade Innovation",
      description:
        "We teach engineers and researchers how to formulate native mathematical models, claim structures, and avoid prior-art pitfalls to publish high-impact work or file patents.",
    },
    {
      icon: Lightbulb,
      title: "Real-World Field Telemetry & Data",
      description:
        "Train machine learning models on messy, real-world field telemetry—from multi-sensor hardware streams and physical ADC noise to high-resolution edge optical feeds.",
    },
  ];

  // Strictly preserve founder order: Abhay, Anant, Anamika
  const team = [
    {
      name: "Abhay",
      role: "Applied ML & Computer Vision",
      bio: "Specializes in deep learning vision architectures, edge model quantization, and real-time computer vision deployment.",
    },
    {
      name: "Anant",
      role: "Embedded Systems & IoT Engineer",
      bio: "Focuses on sensor telemetry, microcontroller firmware, hardware-in-the-loop, and edge computing.",
    },
    {
      name: "Anamika",
      role: "AI & ML Research Lead",
      bio: "Specializing in predictive machine learning architectures, statistical modeling, and research data pipelines.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#070A12] border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>About MetaQuest Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Democratizing Frontier Research & Applied Deep-Tech.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            MetaQuest Solutions was founded by researchers and system builders to bridge the gap between academic college syllabus and high-impact patentable innovation. We build and mentor real systems.
          </p>
        </motion.div>

        {/* 3 Pillars Grid with Framer Motion Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-white/20 transition-all group backdrop-blur-xl shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 text-cyan-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Foundational Mentors Section */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-2xl font-bold text-white">Founding Research Mentors</h3>
              <p className="text-xs text-gray-400">Guiding every live hands-on cohort</p>
            </div>
            <span className="text-xs font-mono text-cyan-400">MetaQuest Core Team</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-cyan-500/30 transition-all backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-lg mb-4 shadow-md shadow-cyan-500/20">
                  {member.name.charAt(0)}
                </div>
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <div className="text-xs font-mono text-cyan-400 mb-2">{member.role}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
