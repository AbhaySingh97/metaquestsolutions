"use client";

import { motion } from "framer-motion";

export default function HorizonGlow() {
  return (
    <div className="relative w-full overflow-hidden pointer-events-none py-12 flex justify-center">
      {/* Curved glowing horizon line */}
      <div className="relative w-full max-w-5xl h-24 flex items-center justify-center">
        {/* Deep ambient glow blur */}
        <div className="absolute -top-12 w-[600px] sm:w-[800px] h-[120px] bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-teal-400/20 rounded-full blur-[90px]" />
        
        {/* Crisp curved arch line */}
        <svg
          viewBox="0 0 1000 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-cyan-400/30"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 Q500,-40 1000,120"
            stroke="url(#horizon-gradient)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="horizon-gradient" x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
              <stop offset="25%" stopColor="rgba(6, 182, 212, 0.4)" />
              <stop offset="50%" stopColor="rgba(129, 140, 248, 0.9)" />
              <stop offset="75%" stopColor="rgba(45, 212, 191, 0.4)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Focal center light flare */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 w-32 h-4 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-sm"
        />
      </div>
    </div>
  );
}
