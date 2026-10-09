"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Cpu,
  Eye,
  Activity,
} from "lucide-react";

interface CodeTab {
  id: string;
  name: string;
  lang: string;
  icon: React.ReactNode;
  code: string;
  output: string[];
}

const TABS: CodeTab[] = [
  {
    id: "ml-predict",
    name: "crop_recommendation.py",
    lang: "Python",
    icon: <Code2 className="w-4 h-4 text-cyan-400" />,
    code: `# Real-Time ML Inference with Soil Telemetry
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Incoming telemetry: [Nitrogen, Phosphorus, Potassium, Temp, Humidity, pH, Rainfall]
telemetry_vector = np.array([[88.0, 42.0, 40.0, 24.8, 81.2, 6.72, 202.9]])

# Model prediction with confidence distribution
crop_prediction = model.predict(telemetry_vector)[0]
confidence = np.max(model.predict_proba(telemetry_vector)) * 100

print(f"[MODEL] Recommended Crop: {crop_prediction.upper()} (Confidence: {confidence:.1f}%)")
print("[SYSTEM] Irrigation valve auto-scheduled for 05:30 AM IST")`,
    output: [
      "[INFO] Loading trained RandomForest model weights (v2.4)...",
      "[INFO] Ingesting real-time telemetry from ESP32 gateway...",
      "[DATA] N: 88mg/kg | P: 42mg/kg | K: 40mg/kg | pH: 6.72 | Moisture: 81.2%",
      "[MODEL] Evaluating feature importance matrix...",
      "[MODEL] Recommended Crop: COFFEE (Confidence: 98.4%)",
      "[DISPATCH] Triggering MQTT payload to cloud broker...",
      "[SUCCESS] Inference completed in 14.2ms. Valve automation scheduled.",
    ],
  },
  {
    id: "iot-firmware",
    name: "esp32_iot_node.ino",
    lang: "C++ (Arduino)",
    icon: <Cpu className="w-4 h-4 text-amber-400" />,
    code: `// ESP32 Telemetry Serialization & WiFi Client
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

void publishSoilMetrics() {
  StaticJsonDocument<256> doc;
  doc["sensor_id"] = "MQ-SOIL-01";
  doc["npk_n"] = analogRead(PIN_N) * CALIBRATION_N;
  doc["ph"] = analogRead(PIN_PH) * CALIBRATION_PH;
  doc["rssi"] = WiFi.RSSI();

  char buffer[256];
  serializeJson(doc, buffer);
  mqttClient.publish("metaquest/telemetry/live", buffer);
  Serial.println("[ESP32] Telemetry published to MQTT broker");
}`,
    output: [
      "[ESP32] Initializing ESP32-WROOM-32 hardware registers...",
      "[WIFI] Connecting to edge hotspot: MQ-LAB-5G...",
      "[WIFI] Connected! Assigned IP: 192.168.1.144 (Signal: -54 dBm)",
      "[SENSORS] Reading 12-bit ADC on GPIO34 (NPK) & GPIO35 (pH)...",
      "[JSON] Serialized 148-byte telemetry payload",
      "[MQTT] Connected to broker (mqtt.metaquestsolutions.com:8883 - TLS 1.3)",
      "[SUCCESS] Telemetry published successfully (QoS 1, Latency: 18ms)",
    ],
  },
  {
    id: "cv-edge",
    name: "plant_pathology_cv.py",
    lang: "Python / PyTorch",
    icon: <Eye className="w-4 h-4 text-emerald-400" />,
    code: `# Real-Time Plant Leaf Pathology Classification
import torch
import torchvision.transforms as T
from PIL import Image

def detect_leaf_blight(image_path):
    image = Image.open(image_path).convert("RGB")
    tensor = transform_pipeline(image).unsqueeze(0)
    
    with torch.no_grad():
        logits = vision_model(tensor)
        predicted_idx = torch.argmax(logits, dim=1).item()
        
    status = CLASS_NAMES[predicted_idx]
    severity = torch.softmax(logits, dim=1)[0][predicted_idx].item() * 100
    return status, severity`,
    output: [
      "[PYTORCH] Initializing MobileNetV3-Small on Edge Accelerator...",
      "[IMAGE] Ingesting 1080p frame from camera pipeline...",
      "[CV] Applying Bilinear Interpolation & Image Normalization...",
      "[INFERENCE] Forward pass completed on tensor shape: [1, 3, 224, 224]",
      "[RESULT] Detected: Early Blight (Alternaria solani) - Severity: 94.6%",
      "[ACTION] Generated bounding box overlay and treatment advisory.",
      "[SUCCESS] Vision pipeline cycle closed in 22.8ms.",
    ],
  },
];

export default function TerminalShowcase() {
  const [activeTab, setActiveTab] = useState<CodeTab>(TABS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>(TABS[0].output);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (tab: CodeTab) => {
    setActiveTab(tab);
    setConsoleOutput(tab.output);
    setIsRunning(false);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < activeTab.output.length) {
        setConsoleOutput((prev) => [...prev, activeTab.output[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 280);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4"
        >
          <TerminalIcon className="w-3.5 h-3.5" />
          Interactive Code Showcase
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          Real Code You Actually{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            Write & Run
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-400 text-base sm:text-lg"
        >
          Inspect sample code snippets straight from our workshop curriculum. Click
          <strong className="text-white"> Run Script </strong> to simulate real-time live execution.
        </motion.p>
      </div>

      {/* Terminal Window Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/10 bg-[#0A0E1A] shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-4 py-3 bg-[#070A12]/80 gap-3">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer" />
            <span className="ml-3 hidden sm:inline-block text-xs font-mono text-gray-400">
              metaquest-live-lab: ~/{activeTab.name}
            </span>
          </div>

          {/* Interactive Script Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {TABS.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.icon}
                    {tab.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons: Copy Code & Run Script */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shadow-md ${
                isRunning
                  ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-cyan-500/20 active:scale-95"
              }`}
            >
              {isRunning ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run Script
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Editor Body */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-gray-300 bg-[#060911]/90 overflow-x-auto max-h-[340px]">
          <pre className="leading-relaxed">
            <code>{activeTab.code}</code>
          </pre>
        </div>

        {/* Live Execution Output Console */}
        <div className="border-t border-white/10 bg-[#04060B] p-4 sm:p-6 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <div className="flex items-center gap-2 text-gray-400">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-gray-300 uppercase tracking-wider text-[11px]">
                Execution Terminal
              </span>
              <span className="text-[10px] text-gray-500">(stdout)</span>
            </div>
            <button
              onClick={() => setConsoleOutput(activeTab.output)}
              className="text-[11px] text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Logs
            </button>
          </div>

          <div className="space-y-1.5 min-h-[140px] max-h-[220px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {consoleOutput.map((line, idx) => {
                const isSuccess = line.includes("[SUCCESS]") || line.includes("100%");
                const isData = line.includes("[DATA]");
                const isModel = line.includes("[MODEL]");
                const isResult = line.includes("[RESULT]");

                let textColor = "text-gray-400";
                if (isSuccess) textColor = "text-emerald-400 font-semibold";
                else if (isData) textColor = "text-amber-300";
                else if (isModel) textColor = "text-cyan-300 font-semibold";
                else if (isResult) textColor = "text-rose-300 font-semibold";

                return (
                  <motion.div
                    key={`${activeTab.id}-${idx}-${line}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2 ${textColor}`}
                  >
                    <span className="text-gray-600 select-none">{">"}</span>
                    <span>{line}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isRunning && (
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-cyan-400 inline-block align-middle ml-4"
              />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
