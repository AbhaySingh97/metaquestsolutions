"use client";

import Link from "next/link";

export default function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const isLarge = size === "large";

  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Official transparent logo mark */}
      <div className="relative flex items-center justify-center p-1 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
        <img
          src="/logo_icon.png"
          alt="MetaQuest"
          className={`${isLarge ? "w-11 h-11" : "w-9 h-9"} object-contain group-hover:scale-105 transition-transform duration-200`}
        />
      </div>

      <div className="flex flex-col">
        <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
          MetaQuest <span className="text-cyan-400">Solutions</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono -mt-0.5">
          Research & Tech Innovation Lab
        </span>
      </div>
    </Link>
  );
}
