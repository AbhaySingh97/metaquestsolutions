import { MetricItem } from "@/lib/db";
import { BookOpen, Video, Cpu, ShieldCheck } from "lucide-react";

interface StatsBarProps {
  metrics?: MetricItem[];
}

const defaultIcons = [BookOpen, Video, Cpu, ShieldCheck];

export default function StatsBar({ metrics }: StatsBarProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-10 border-y border-white/5 bg-surface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((item, idx) => {
            const Icon = defaultIcons[idx % defaultIcons.length];
            return (
              <div
                key={item.id || idx}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                    Pillar 0{idx + 1}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-gray-300 mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
