"use client";

import { useState } from "react";
import { Workshop } from "@/data/workshops";
import WorkshopCard from "./WorkshopCard";
import { Search, Filter } from "lucide-react";

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
    <section id="workshops" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-mono tracking-wider uppercase mb-4">
            <span>Scheduled Real-Time Masterclasses</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Upcoming Live Workshops
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Select a domain below to explore interactive roadmap curriculums and register your seat directly via the official Google Form.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-cyan-500 text-black shadow-md"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search topics, AI, IoT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
            />
          </div>
        </div>

        {/* Workshops Grid */}
        {filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onSelectSyllabus={onSelectSyllabus}
                onSelectRegister={onSelectRegister}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl glass-panel border border-white/10">
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
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
