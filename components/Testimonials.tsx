import { TESTIMONIALS_DATA } from "@/data/workshops";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface/30 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span>Verified Attendee Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Hear From Our Researchers & Attendees
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Engineers, PhD candidates, and startup founders who leveled up their projects with MetaQuest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-xs text-cyan-400">{t.role}</div>
                  <div className="text-[11px] text-gray-400">{t.institution}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
