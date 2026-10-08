import { Cpu, Lightbulb, FileText } from "lucide-react";

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
      title: "Real Agricultural & Urban Datasets",
      description:
        "Train machine learning models on messy, real-world field telemetry—from soil chemistry (N, P, K, pH) to heterogeneous mixed Indian traffic dynamics.",
    },
  ];

  const team = [
    {
      name: "Abhay",
      role: "Applied ML & Computer Vision",
      bio: "Specializes in deep learning vision models, agricultural disease classification, and edge deployment.",
    },
    {
      name: "Anant",
      role: "Embedded Systems & IoT Engineer",
      bio: "Focuses on sensor telemetry, microcontroller firmware, hardware-in-the-loop, and edge computing.",
    },
    {
      name: "Anamika",
      role: "AI & ML Research Lead",
      bio: "Specializing in agronomic machine learning, predictive modeling, and data science architecture.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0B0F19] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-mono uppercase tracking-wider mb-4">
            <span>About MetaQuest Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Democratizing Frontier Research & Applied Deep-Tech.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            MetaQuest Solutions was founded by researchers and system builders to bridge the massive gap between academic college syllabus and high-impact patentable innovation. We build and mentor real systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-surface/80 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

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
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-lg mb-4">
                  {member.name.charAt(0)}
                </div>
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <div className="text-xs font-mono text-cyan-400 mb-2">{member.role}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
