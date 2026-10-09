"use client";

import { useState } from "react";
import { Workshop } from "@/data/workshops";
import WorkshopCard from "./WorkshopCard";
import HorizonGlow from "./HorizonGlow";
import { Search, Filter, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkshopListProps {
  workshops?: Workshop[];
  onSelectSyllabus: (workshop: Workshop) => void;
  onSelectRegister: (workshop: Workshop) => void;
}

const CATEGORIES = [
  "All",
  "Agritech",
  "AI/ML",
  "Patents & Research",
  "IoT & Smart Systems",
];

export default function WorkshopList({
  workshops = [],
  onSelectSyllabus,
  onSelectRegister,
}: WorkshopListProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesCategory =
      selectedCategory === "All" || workshop.category === selectedCategory;
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="workshops" className="py-24 relative bg-[#070A12]">
      {/* Magic UI Style Horizon Arc Glow */}
      <HorizonGlow />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterclasses</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Curated Hands-On Cohorts.
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Select a cohort below to explore interactive roadmap curriculums and register your seat directly via Google Form.
          </p>
        </motion.div>

        {/* Filter & Search Bar with Framer Motion Sliding Pill */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs with Animated Pill */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none p-1 rounded-2xl bg-white/[0.03] border border-white/5">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap z-10 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span>{category}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-white/15 border border-white/20 rounded-xl -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search topics, AI, IoT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
            />
          </div>
        </div>

        {/* Workshops Grid */}
        <AnimatePresence mode="popLayout">
          {filteredWorkshops.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredWorkshops.map((workshop) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  onSelectSyllabus={onSelectSyllabus}
                  onSelectRegister={onSelectRegister}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/10"
            >
              <Filter className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">No Workshops Found</h3>
              <p className="text-sm text-gray-400 mb-4">
                We couldn't find any workshops matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-gray-100 transition-all shadow-md"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
