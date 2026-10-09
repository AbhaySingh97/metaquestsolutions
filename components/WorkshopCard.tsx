"use client";

import { useState } from "react";
import { Workshop } from "@/data/workshops";
import {
  Calendar,
  Clock,
  Users,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  GitBranch,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkshopCardProps {
  workshop: Workshop;
  onSelectSyllabus?: (workshop: Workshop) => void;
  onSelectRegister?: (workshop: Workshop) => void;
}

export default function WorkshopCard({
  workshop,
  onSelectSyllabus,
}: WorkshopCardProps) {
  const [expandedRoadmap, setExpandedRoadmap] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const seatsRemaining = Math.max(0, workshop.totalSeats - (workshop.seatsBooked || 0));
  const percentageFilled = Math.round(
    ((workshop.seatsBooked || 0) / (workshop.totalSeats || 1)) * 100
  );

  const handleRegisterClick = () => {
    if (workshop.googleFormUrl) {
      window.open(workshop.googleFormUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Registration Google Form for this workshop is being configured.");
    }
  };

  const modules = workshop.curriculum || [];
  const visibleModules = expandedRoadmap ? modules : modules.slice(0, 3);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all relative group overflow-hidden backdrop-blur-xl shadow-xl shadow-black/50"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium tracking-wide">
            {workshop.category}
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{workshop.badge}</span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 leading-snug group-hover:text-cyan-300 transition-colors">
          {workshop.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-5 leading-relaxed">
          {workshop.subtitle}
        </p>

        {/* Timing Details */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-black/50 border border-white/5 text-xs text-gray-300 mb-5 font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{workshop.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="truncate">{workshop.duration}</span>
          </div>
        </div>

        {/* Seats Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-400 flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              Cohort Capacity
            </span>
            <span className="font-mono text-cyan-400 font-medium">
              {seatsRemaining} seats left / {workshop.totalSeats} total
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentageFilled}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-indigo-600 rounded-full"
            />
          </div>
        </div>

        {/* ROADMAP CURRICULUM ANIMATED DISPLAY */}
        <div className="mb-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
                Syllabus Roadmap ({modules.length} Modules)
              </span>
            </div>
            {modules.length > 3 && (
              <button
                type="button"
                onClick={() => setExpandedRoadmap(!expandedRoadmap)}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>{expandedRoadmap ? "Collapse Roadmap" : `Show All ${modules.length}`}</span>
                {expandedRoadmap ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          {/* Connected Roadmap Pathway with Animated Node Indicator */}
          <div className="relative pl-6 space-y-3.5">
            {/* Roadmap vertical track */}
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-indigo-500 to-cyan-400/20 rounded-full" />

            <AnimatePresence>
              {visibleModules.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    onClick={() => setActiveStep(idx)}
                    className={`relative cursor-pointer group/step p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-white/[0.05] border border-white/10 shadow-sm"
                        : "hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    {/* Animated Roadmap Node Indicator */}
                    <div
                      className={`absolute -left-[19px] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-cyan-400 border-[#070A12] scale-110 shadow-md shadow-cyan-400/40"
                          : "bg-[#070A12] border-cyan-500/60 group-hover/step:border-cyan-400"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-black" : "bg-cyan-400"
                        }`}
                      />
                    </div>

                    {/* Module Header */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/5 font-semibold">
                          Step 0{idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-white group-hover/step:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">
                        {item.duration}
                      </span>
                    </div>

                    {/* Topics Preview */}
                    <div className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed pl-1 mt-1">
                      {item.topics.join(" • ")}
                    </div>

                    {item.speaker && (
                      <div className="text-[10px] font-mono text-gray-400 mt-1 pl-1">
                        Mentor: {item.speaker}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Deliverables tags */}
        <div className="space-y-2 mb-6">
          {workshop.handsOnOutcomes.slice(0, 2).map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & Google Form Redirect Action Footer (Magic UI Button Style) */}
      <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
            Registration Fee
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              ₹{workshop.discountedPrice}
            </span>
            <span className="text-sm text-gray-500 line-through font-mono">
              ₹{workshop.originalPrice}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono">
              SAVE {Math.round(((workshop.originalPrice - workshop.discountedPrice) / workshop.originalPrice) * 100)}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {onSelectSyllabus && (
            <button
              onClick={() => onSelectSyllabus(workshop)}
              className="px-4 py-3 rounded-full text-xs font-medium text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <span>Overview</span>
            </button>
          )}

          {/* Direct Redirection to Google Form (Crisp White Pill) */}
          <button
            onClick={handleRegisterClick}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-full text-xs font-bold text-black bg-white hover:bg-gray-100 transition-all shadow-lg shadow-cyan-500/10 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Register via Google Form</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
