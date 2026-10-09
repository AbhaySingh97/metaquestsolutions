"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scan,
  Cpu,
  FileCheck2,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  Wifi,
  Database,
  ArrowRight,
} from "lucide-react";

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"vision" | "iot" | "patent">("vision");
  const [selectedDetection, setSelectedDetection] = useState<number>(0);

  const detections = [
    {
      id: 0,
      label: "Early Foliar Blight",
      confidence: "98.7%",
      box: { top: "22%", left: "28%", width: "36%", height: "32%" },
      severity: "Moderate (Actionable)",
      treatment: "Targeted Bio-Fungicide (Micro-dose spray)",
      color: "from-amber-500 to-red-500",
      accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      id: 1,
      label: "Nitrogen Chlorosis Spot",
      confidence: "95.2%",
      box: { top: "58%", left: "44%", width: "32%", height: "28%" },
      severity: "Low Deficiency",
      treatment: "Localized Foliar Urea Enrichment (2% w/v)",
      color: "from-cyan-500 to-blue-500",
      accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    {
      id: 2,
      label: "Healthy Canopy Tissue",
      confidence: "99.4%",
      box: { top: "18%", left: "68%", width: "24%", height: "38%" },
      severity: "Normal Biomass",
      treatment: "No Intervention Required",
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0B0F19]">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-indigo-600/10 to-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Cohort Preview</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            What You Build & Deploy Hands-On
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Experience the real hardware pipelines, computer vision models, and patent frameworks built step-by-step during the live cohort.
          </p>
        </motion.div>

        {/* Tab Selector Buttons with Framer Motion Sliding Pill */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-center gap-1.5">
            {[
              {
                id: "vision",
                label: "Edge AI Computer Vision",
                icon: Scan,
                badge: "YOLOv8 & PyTorch",
              },
              {
                id: "iot",
                label: "Microcontroller Telemetry",
                icon: Cpu,
                badge: "ESP32 & MQTT",
              },
              {
                id: "patent",
                label: "Patent & Novelty Dossier",
                icon: FileCheck2,
                badge: "IP & Filing",
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 z-10 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {tab.badge}
                  </span>

                  {/* Active sliding pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-700 rounded-xl -z-10 shadow-lg shadow-cyan-500/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Visualizer Panel */}
        <div className="rounded-3xl glass-card border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* TAB 1: COMPUTER VISION SIMULATOR */}
            {activeTab === "vision" && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visualizer Canvas (Interactive Leaf Bounding Boxes) */}
                <div className="lg:col-span-7 rounded-2xl bg-black/60 border border-white/10 p-5 relative overflow-hidden min-h-[360px] flex flex-col justify-between">
                  {/* Top HUD bar */}
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Activity className="w-4 h-4 animate-pulse" />
                      <span>LIVE INFERENCE FEED (30 FPS)</span>
                    </div>
                    <span className="text-[11px] bg-white/5 px-2 py-0.5 rounded text-gray-300">
                      Latency: 14.2ms • Edge NPU
                    </span>
                  </div>

                  {/* Simulated Inspection Canvas */}
                  <div className="relative flex-1 rounded-xl bg-gradient-to-br from-gray-900 via-[#0d1527] to-gray-950 border border-white/5 flex items-center justify-center p-6 min-h-[260px] overflow-hidden">
                    {/* Grid texture inside canvas */}
                    <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

                    {/* Central Plant Graphic representation */}
                    <div className="relative z-0 text-center select-none">
                      <div className="w-32 h-32 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
                        <Layers className="w-16 h-16 text-emerald-400/80" />
                      </div>
                      <span className="text-xs font-mono text-gray-500">
                        Canopy Target: Solanum lycopersicum (Field Area 4B)
                      </span>
                    </div>

                    {/* Interactive Bounding Boxes */}
                    {detections.map((d) => {
                      const isSelected = selectedDetection === d.id;
                      return (
                        <motion.div
                          key={d.id}
                          onClick={() => setSelectedDetection(d.id)}
                          style={{
                            top: d.box.top,
                            left: d.box.left,
                            width: d.box.width,
                            height: d.box.height,
                          }}
                          whileHover={{ scale: 1.04 }}
                          className={`absolute cursor-pointer rounded-lg border-2 transition-all p-1.5 flex flex-col justify-between backdrop-blur-[2px] ${
                            isSelected
                              ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30"
                              : "border-white/30 bg-black/30 hover:border-white/60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/80 text-white font-bold truncate">
                              {d.label}
                            </span>
                            <span className="text-[9px] font-mono text-cyan-300 font-bold ml-1">
                              {d.confidence}
                            </span>
                          </div>

                          {/* Corner crosshairs */}
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Bottom Controls Info */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span>Click on any bounding box to inspect disease pathology</span>
                    <span className="text-cyan-400">YOLOv8 Nano • PyTorch Export</span>
                  </div>
                </div>

                {/* Inspection Diagnostics Side Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Scan className="w-4 h-4" />
                    <span>Real-Time Pathology Diagnostics</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {detections[selectedDetection].label}
                  </h3>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Model Confidence</span>
                      <span className="font-mono text-white font-bold text-sm">
                        {detections[selectedDetection].confidence}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Severity Assessment</span>
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded border ${detections[selectedDetection].accent}`}
                      >
                        {detections[selectedDetection].severity}
                      </span>
                    </div>
                    <div className="border-t border-white/5 pt-2">
                      <span className="text-xs text-gray-400 block mb-1">
                        Prescribed Agronomic Action:
                      </span>
                      <p className="text-xs text-emerald-300 font-mono">
                        {detections[selectedDetection].treatment}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-gray-300 pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>Custom Dataset Augmentation (Field Glare & Shadow Filters)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>ONNX & TensorRT Quantization for Low-Cost Microcontrollers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>Automated Drone & Handheld Camera Video Stream Pipeline</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: IOT SENSOR TELEMETRY */}
            {activeTab === "iot" && (
              <motion.div
                key="iot"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Telemetry Dashboard Graphic */}
                <div className="lg:col-span-7 rounded-2xl bg-black/60 border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Wifi className="w-4 h-4 animate-pulse" />
                      <span>ESP32 SENSOR NODE • FIRMWARE v2.4</span>
                    </div>
                    <span className="text-cyan-300">Broker: MQTT TLS 8883</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Soil Moisture", value: "38.4 %", status: "Optimal Zone" },
                      { label: "Soil pH Level", value: "6.52 pH", status: "Neutral" },
                      { label: "Nitrogen (N)", value: "142 mg/kg", status: "Balanced" },
                      { label: "Phosphorus (P)", value: "48 mg/kg", status: "Good" },
                      { label: "Potassium (K)", value: "198 mg/kg", status: "High" },
                      { label: "Ambient Temp", value: "27.8 °C", status: "Nominal" },
                    ].map((sensor, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors"
                      >
                        <span className="text-[10px] font-mono text-gray-400 uppercase block">
                          {sensor.label}
                        </span>
                        <div className="text-lg font-bold font-mono text-white mt-0.5">
                          {sensor.value}
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400">
                          {sensor.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-gray-300 space-y-1">
                    <div className="text-[10px] text-gray-500 uppercase">
                      Live Telemetry JSON Packet Stream:
                    </div>
                    <div className="text-cyan-400 text-[11px] truncate">
                      {`{"nodeId": "MQ-FIELD-01", "moisture": 38.4, "pH": 6.52, "NPK": [142, 48, 198], "ts": 1729744800}`}
                    </div>
                  </div>
                </div>

                {/* Telemetry Explanation */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    <span>Hardware-in-the-Loop Architecture</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    Direct Microcontroller Coding & Cloud Sync
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    Build end-to-end hardware systems rather than toy simulations. Write production-ready C++ firmware for ESP32 microcontrollers, wire analog sensors with proper pull-ups, and stream telemetry over MQTT into real-time dashboards.
                  </p>

                  <div className="space-y-2 text-xs text-gray-300 pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Non-blocking FreeRTOS tasks & low-power sleep modes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Analog sensor noise filtering & digital calibration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Fail-safe relay triggers for automated irrigation valves</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PATENT DOSSIER */}
            {activeTab === "patent" && (
              <motion.div
                key="patent"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Patent Formulation Card */}
                <div className="lg:col-span-7 rounded-2xl bg-black/60 border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-white/10 pb-3">
                    <span className="text-indigo-400 font-bold">
                      INTELLECTUAL PROPERTY & NOVELTY BLUEPRINT
                    </span>
                    <span className="bg-white/5 px-2 py-0.5 rounded text-gray-300">
                      Standard: Indian Patent Act / PCT Filing
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        step: "Claim 01: Novel Independent Claim",
                        desc: "Formulation of closed-loop adaptive fertilization based on multi-spectral NDVI & soil ion sensing.",
                      },
                      {
                        step: "Claim 02: Hardware Dependent Claims",
                        desc: "Specific hierarchical bus routing preventing telemetry packet drop under extreme thermal conditions.",
                      },
                      {
                        step: "Prior Art Differential Matrix",
                        desc: "Systematic proof showing novelty over existing commercial irrigation patents.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
                      >
                        <span className="text-xs font-mono text-indigo-300 font-semibold block">
                          {item.step}
                        </span>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patent Formulation Explanation */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4" />
                    <span>Research-Grade Deliverables</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    Publish or File With Complete Confidence
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    Most college projects get abandoned as generic code. MetaQuest mentors guide you on how to turn your project implementation into a formal patent draft or IEEE/Springer research submission with defensible mathematical claims.
                  </p>

                  <div className="space-y-2 text-xs text-gray-300 pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>Patent searching techniques on Google Patents & InPASS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>Structure of Provisional Specifications & Form 1/2 filing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>Pre-drafted template dossiers provided with every cohort</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
