"use client";

import { Workshop } from "@/data/workshops";
import { X, Calendar, Clock, CheckCircle2, User, Wrench, ExternalLink } from "lucide-react";

interface SyllabusModalProps {
  workshop: Workshop | null;
  onClose: () => void;
  onRegister?: (workshop: Workshop) => void;
}

export default function SyllabusModal({
  workshop,
  onClose,
}: SyllabusModalProps) {
  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-surface rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-white/10 bg-[#0B0F19]/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
                {workshop.category}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {workshop.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {workshop.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {workshop.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {workshop.time}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-7 flex-1">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">
              Course Overview & Research Scope
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {workshop.overview}
            </p>
          </div>

          {/* Speakers */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-semibold">
              Instructors & Mentors
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workshop.speakers.map((spk, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{spk.name}</div>
                    <div className="text-xs text-gray-400">{spk.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Curriculum Modules */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-semibold">
              Syllabus & Module Breakdown
            </h4>
            <div className="space-y-3">
              {workshop.curriculum.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {item.module}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-gray-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                      {item.duration}
                    </span>
                  </div>
                  <ul className="space-y-1.5 mt-2 pl-2">
                    {item.topics.map((t, tidx) => (
                      <li key={tidx} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  {item.speaker && (
                    <div className="mt-3 text-[11px] text-gray-400 italic">
                      Led by: {item.speaker}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes & Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <h5 className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Hands-on Deliverables
              </h5>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {workshop.handsOnOutcomes.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <h5 className="text-xs font-mono uppercase text-indigo-400 font-semibold mb-2.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                Tools & Assets Provided
              </h5>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {workshop.toolsProvided.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400">⚡</span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="p-5 sm:p-6 bg-[#0B0F19] border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-400">Investment</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">
                ₹{workshop.discountedPrice}
              </span>
              <span className="text-xs text-gray-500 line-through">
                ₹{workshop.originalPrice}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (workshop.googleFormUrl) {
                  window.open(workshop.googleFormUrl, "_blank", "noopener,noreferrer");
                }
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 flex items-center gap-2"
            >
              <span>Register via Google Form</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
