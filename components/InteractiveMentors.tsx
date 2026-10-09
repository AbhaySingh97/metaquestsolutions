"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Brain,
  Video,
  ExternalLink,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";

interface Mentor {
  name: string;
  role: string;
  focus: string;
  avatarGradient: string;
  skills: string[];
  bio: string;
}

const MENTORS: Mentor[] = [
  {
    name: "Abhay",
    role: "Senior Applied ML & Computer Vision Engineer",
    focus: "AI Models, Vision Pipelines & Inference",
    avatarGradient: "from-cyan-400 via-blue-500 to-indigo-600",
    skills: ["Deep Learning", "Computer Vision", "Model Deployment", "Python / PyTorch"],
    bio: "Guides hands-on architecture design, model training, edge optimization, and live deployment for production AI systems.",
  },
  {
    name: "Anant",
    role: "IoT & Embedded Systems Engineer",
    focus: "ESP32, Microcontroller Firmware & Hardware Telemetry",
    avatarGradient: "from-amber-400 via-orange-500 to-rose-600",
    skills: ["ESP32 / C++", "Sensor Telemetry", "MQTT / HTTP", "Hardware Debugging"],
    bio: "Leads physical sensor calibration, ADC telemetry serialization, firmware engineering, and live hardware screen debugging.",
  },
  {
    name: "Anamika",
    role: "AI & ML Research Lead",
    focus: "Predictive Modeling, Statistical AI & Datasets",
    avatarGradient: "from-purple-400 via-pink-500 to-indigo-500",
    skills: ["Predictive Analytics", "Feature Engineering", "Data Cleaning", "Research Validation"],
    bio: "Specializes in tabular machine learning models, statistical algorithm validation, and turning research ideas into working code.",
  },
];

export default function InteractiveMentors() {
  const [activeMentor, setActiveMentor] = useState<number | null>(null);

  return (
    <div className="mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Video className="w-3.5 h-3.5" />
            100% Live Interactive Mentors
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Learn Directly From Practicing Engineers
          </h3>
        </div>
        <span className="text-xs font-mono text-gray-400">
          Google Meet Live Screen-Sharing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MENTORS.map((mentor, idx) => {
          const isSelected = activeMentor === idx;

          return (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setActiveMentor(idx)}
              onMouseLeave={() => setActiveMentor(null)}
              whileHover={{ y: -6 }}
              className={`relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 backdrop-blur-xl flex flex-col justify-between ${
                isSelected
                  ? "border-cyan-500/50 bg-[#0E1322] shadow-2xl shadow-cyan-500/10"
                  : "border-white/10 bg-[#0B0F19]/80 hover:border-white/20"
              }`}
            >
              {/* Top Row: Avatar & Live Status */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mentor.avatarGradient} text-white font-extrabold flex items-center justify-center text-xl shadow-lg`}
                  >
                    {mentor.name.charAt(0)}
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Mentor
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-1">{mentor.name}</h4>
                <p className="text-xs font-mono text-cyan-400 mb-3">{mentor.role}</p>

                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  {mentor.bio}
                </p>
              </div>

              {/* Skills Tags */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  Core Competencies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
