"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Workshop } from "@/data/workshops";
import { SiteSettings, MetricItem, FAQItem } from "@/lib/db";
import {
  Layers,
  Users,
  DollarSign,
  Download,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Search,
  CreditCard,
  BarChart3,
  LogOut,
  ShieldAlert,
  Save,
  X,
  Eye,
  EyeOff,
  Inbox,
  RefreshCw,
  Sliders,
  Sparkles,
} from "lucide-react";

// Configured Admin Credentials (Provided privately in chat)
const ADMIN_CREDENTIALS = {
  username: "admin@metaquestsolutions.com",
  password: "MetaQuest@2026",
};

interface Registrant {
  id: string;
  ticketCode: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  workshopId: string;
  workshopTitle: string;
  amount: number;
  paymentId: string;
  date: string;
  status: "CONFIRMED" | "REFUNDED" | "PENDING";
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInput, setLoginInput] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"workshops" | "settings" | "monitor">("workshops");

  // CMS State
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [savingWorkshop, setSavingWorkshop] = useState(false);

  // Site Settings State
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Live Monitoring State
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);
  const [searchAttendee, setSearchAttendee] = useState("");
  const [selectedWorkshopFilter, setSelectedWorkshopFilter] = useState("All");

  // Load live data from backend APIs
  const loadAdminData = async () => {
    try {
      const [wsRes, setRes, regRes] = await Promise.all([
        fetch("/api/admin/workshops", { cache: "no-store" }),
        fetch("/api/admin/settings", { cache: "no-store" }),
        fetch("/api/admin/registrations", { cache: "no-store" }),
      ]);

      const wsData = await wsRes.json();
      if (wsData.success) setWorkshops(wsData.workshops);

      const setData = await setRes.json();
      if (setData.success) setSettings(setData.settings);

      const regData = await regRes.json();
      if (regData.success) setRegistrants(regData.registrations);
    } catch (e) {
      console.error("Failed to load admin data:", e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  // Real Calculated Metrics
  const totalRevenue = registrants.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const totalRegistrations = registrants.length;
  const avgTicket = totalRegistrations > 0 ? Math.round(totalRevenue / totalRegistrations) : 0;
  const successRate = totalRegistrations > 0 ? "100%" : "—";

  // Login Form
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginInput.username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
      loginInput.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Access denied.");
    }
  };

  // Save Workshop to Backend Database
  const handleSaveWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkshop) return;
    setSavingWorkshop(true);
    try {
      const res = await fetch("/api/admin/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workshop: editingWorkshop }),
      });
      const data = await res.json();
      if (data.success) {
        setWorkshops(data.workshops);
        setEditingWorkshop(null);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingWorkshop(false);
    }
  };

  // Delete Workshop from Backend Database
  const handleDeleteWorkshop = async (id: string) => {
    if (!confirm("Are you sure you want to remove this workshop? It will be removed from the live site immediately.")) {
      return;
    }
    // Instantly remove from UI
    setWorkshops((prev) => prev.filter((w) => w.id !== id));
    try {
      const res = await fetch(`/api/admin/workshops?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.workshops)) {
        setWorkshops(data.workshops);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Save Site Settings to Backend Database
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setSettingsSavedSuccess(true);
        setTimeout(() => setSettingsSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setSavingSettings(false);
    }
  };

  // Export Attendees CSV
  const handleExportCSV = () => {
    if (registrants.length === 0) {
      alert("No attendee registrations recorded yet to export.");
      return;
    }

    const headers = [
      "Ticket Code",
      "Full Name",
      "Email Address",
      "WhatsApp Phone",
      "Organization",
      "Workshop",
      "Amount Paid",
      "Payment ID",
      "Date",
      "Status",
    ];

    const rows = registrants.map((r) => [
      r.ticketCode,
      `"${r.name}"`,
      r.email,
      `"${r.phone}"`,
      `"${r.organization || 'Independent'}"`,
      `"${r.workshopTitle}"`,
      `INR ${r.amount}`,
      r.paymentId,
      r.date,
      r.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MetaQuest_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrants = registrants.filter((r) => {
    const matchesWorkshop =
      selectedWorkshopFilter === "All" || r.workshopTitle === selectedWorkshopFilter;
    const matchesSearch =
      r.name.toLowerCase().includes(searchAttendee.toLowerCase()) ||
      r.email.toLowerCase().includes(searchAttendee.toLowerCase()) ||
      r.ticketCode.toLowerCase().includes(searchAttendee.toLowerCase()) ||
      (r.organization && r.organization.toLowerCase().includes(searchAttendee.toLowerCase()));
    return matchesWorkshop && matchesSearch;
  });

  // =========================================================================
  // VIEW 1: CLEAN SECURE LOGIN GATE (NO CREDENTIALS SHOWN ON SCREEN)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex items-center justify-center p-4 bg-cyber-grid relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-surface border border-white/10 rounded-2xl p-7 sm:p-8 shadow-2xl relative z-10">
          <div className="text-center mb-7">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 shadow-lg shadow-cyan-500/10 mx-auto mb-3 flex items-center justify-center">
              <img src="/logo_icon.png" alt="MetaQuest" className="w-9 h-9 object-contain" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Command Access</h1>
            <p className="text-xs text-gray-400 mt-1">
              MetaQuest Solutions Operations & CMS Gateway
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Admin User ID / Email
              </label>
              <input
                type="text"
                required
                value={loginInput.username}
                onChange={(e) => setLoginInput({ ...loginInput, username: e.target.value })}
                placeholder="Enter admin ID"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginInput.password}
                  onChange={(e) => setLoginInput({ ...loginInput, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 transition-all shadow-lg shadow-cyan-500/25 mt-2"
            >
              Sign In to Command Center
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED COMMAND CENTER WITH LIVE SYNC
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-surface/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1">
              <img src="/logo_icon.png" alt="MetaQuest" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-white flex items-center gap-2">
                MetaQuest <span className="text-cyan-400">Admin Command</span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                Real-Time Live Site Sync System
              </p>
            </div>
          </div>

          {/* 3 Control Modes */}
          <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("workshops")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "workshops"
                  ? "bg-cyan-500 text-black font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Workshop CMS</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-cyan-500 text-black font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>2. Site Content & Metrics</span>
            </button>
            <button
              onClick={() => setActiveTab("monitor")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "monitor"
                  ? "bg-indigo-600 text-white font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>3. Live Operations</span>
            </button>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8">
        {/* ========================================================================= */}
        {/* TAB 1: WORKSHOP CMS (ADD / EDIT / DELETE WORKSHOPS) */}
        {/* ========================================================================= */}
        {activeTab === "workshops" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-cyan-400" />
                  Live Workshop Inventory
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Changes made here are saved directly to the database and updated on the live website immediately.
                </p>
              </div>

              <button
                onClick={() => {
                  const newW: Workshop = {
                    id: `mq-custom-${Date.now()}`,
                    slug: `workshop-${Date.now()}`,
                    title: "New Frontier Research Workshop",
                    subtitle: "Brief description of the research objectives and hands-on skills.",
                    category: "AI/ML",
                    date: "Saturday, Dec 05, 2026",
                    time: "10:00 AM - 1:00 PM IST",
                    duration: "3 Hours",
                    originalPrice: 1999,
                    discountedPrice: 599,
                    totalSeats: 50,
                    seatsBooked: 0,
                    featured: true,
                    badge: "NEW COHORT",
                    googleFormUrl: "",
                    speakers: [
                      {
                        name: "Lead Researcher",
                        role: "Specialist",
                        organization: "MetaQuest Solutions",
                      },
                    ],
                    overview: "Comprehensive deep-dive into cutting edge methodologies.",
                    curriculum: [
                      {
                        module: "Module 1",
                        title: "Foundations & Telemetry",
                        duration: "45 min",
                        topics: ["Core concepts", "Sensor integration"],
                        speaker: "Lead Researcher",
                      },
                    ],
                    handsOnOutcomes: ["Verified Certificate", "Executable Notebook"],
                    prerequisites: ["Basic programming"],
                    toolsProvided: ["Source Code", "Presentation Slides"],
                  };
                  setEditingWorkshop(newW);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Workshop</span>
              </button>
            </div>

            {/* Workshop Catalog Table */}
            <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Active Workshop Listings</h3>
                  <p className="text-xs text-gray-400">Total {workshops.length} workshops configured</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-black/60 text-xs font-mono uppercase text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="p-4">Workshop Title & Domain</th>
                      <th className="p-4">Schedule</th>
                      <th className="p-4">Fee (₹)</th>
                      <th className="p-4">Seat Capacity</th>
                      <th className="p-4">Badge</th>
                      <th className="p-4">Google Form Link</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {workshops.map((w) => (
                      <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white max-w-sm line-clamp-1">{w.title}</div>
                          <span className="text-xs font-mono text-cyan-400">{w.category}</span>
                        </td>
                        <td className="p-4 text-xs text-gray-300">
                          <div>{w.date}</div>
                          <div className="text-gray-500">{w.duration}</div>
                        </td>
                        <td className="p-4 text-xs">
                          <span className="font-bold text-white">₹{w.discountedPrice}</span>{" "}
                          <span className="text-gray-500 line-through">₹{w.originalPrice}</span>
                        </td>
                        <td className="p-4 text-xs">
                          <div className="font-mono text-cyan-300">
                            {w.seatsBooked || 0} / {w.totalSeats} seats
                          </div>
                          <div className="w-24 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-cyan-400 rounded-full"
                              style={{ width: `${w.totalSeats > 0 ? ((w.seatsBooked || 0) / w.totalSeats) * 100 : 0}%` }}
                            />
                          </div>
                        </td>
                        <td className="p-4 text-xs font-mono">
                          <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300">
                            {w.badge}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-mono">
                          {w.googleFormUrl ? (
                            <a
                              href={w.googleFormUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 max-w-[160px] truncate"
                              title={w.googleFormUrl}
                            >
                              <span className="truncate">{w.googleFormUrl}</span>
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            </a>
                          ) : (
                            <span className="text-gray-500 italic">Not set</span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingWorkshop(w)}
                            className="p-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                            title="Edit Workshop Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteWorkshop(w.id)}
                            className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                            title="Delete Workshop"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SITE SETTINGS & REAL METRICS (ZERO FAKE DATA) */}
        {/* ========================================================================= */}
        {activeTab === "settings" && settings && (
          <form onSubmit={handleSaveSettings} className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-cyan-400" />
                  Live Site Content & Real Metrics
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Customize your real startup numbers, hero headlines, top announcements, and FAQs.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {settingsSavedSuccess && (
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-4 h-4" /> Synced to Live Site!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-400/20"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? "Publishing..." : "Save All Changes & Publish"}</span>
                </button>
              </div>
            </div>

            {/* Announcement Banner */}
            <div className="p-6 rounded-2xl bg-surface/70 border border-white/10 space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Top Announcement Text (Without Emojis)
              </label>
              <input
                type="text"
                value={settings.announcement}
                onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Hero Copy */}
            <div className="p-6 rounded-2xl bg-surface/70 border border-white/10 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Hero Section Copy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Headline Prefix</label>
                  <input
                    type="text"
                    value={settings.heroHeadline}
                    onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Gradient Highlighted Word</label>
                  <input
                    type="text"
                    value={settings.heroHighlight}
                    onChange={(e) => setSettings({ ...settings, heroHighlight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Hero Subtitle Paragraph</label>
                <textarea
                  rows={2}
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Real Metrics Editor (Admin feeds their actual real numbers) */}
            <div className="p-6 rounded-2xl bg-surface/70 border border-white/10 space-y-4">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Real Startup Feature Pillars / Metrics
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Set the exact real statistics or highlights you want visitors to see on the home page.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {settings.metrics.map((m, idx) => (
                  <div key={m.id || idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <span className="text-[11px] font-mono text-cyan-400">Pillar 0{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="Title (e.g. Live Cohorts)"
                      value={m.label}
                      onChange={(e) => {
                        const copy = [...settings.metrics];
                        copy[idx].label = e.target.value;
                        setSettings({ ...settings, metrics: copy });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 4 Active Batches)"
                      value={m.value}
                      onChange={(e) => {
                        const copy = [...settings.metrics];
                        copy[idx].value = e.target.value;
                        setSettings({ ...settings, metrics: copy });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs text-cyan-300 font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Detail text"
                      value={m.detail}
                      onChange={(e) => {
                        const copy = [...settings.metrics];
                        copy[idx].detail = e.target.value;
                        setSettings({ ...settings, metrics: copy });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs text-gray-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-3 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
              >
                {savingSettings ? "Publishing Changes..." : "Publish All Changes to Live Site"}
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: REAL OPERATIONS & REVENUE MONITOR */}
        {/* ========================================================================= */}
        {activeTab === "monitor" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-indigo-400" />
                  Live Operations & Registrations Monitor
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Real-time database feed of registrations and verified attendee records.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadAdminData}
                  disabled={loadingRegistrations}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors"
                  title="Refresh Live Data"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingRegistrations ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Attendee CSV</span>
                </button>
              </div>
            </div>

            {/* Real KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-surface/70 border border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                  <span>TOTAL GROSS REVENUE</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">
                  From real customer payments
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface/70 border border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                  <span>CONFIRMED PARTICIPANTS</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {totalRegistrations} Attendees
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">
                  {registrants.length === 0 ? "Awaiting bookings" : "Live recorded attendees"}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface/70 border border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                  <span>AVERAGE TICKET SIZE</span>
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  ₹{avgTicket}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">
                  Calculated per booking
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface/70 border border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                  <span>GATEWAY SUCCESS RATE</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {successRate}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">
                  Verified payments
                </div>
              </div>
            </div>

            {/* Registrations Filter & Live Table */}
            <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    Real-Time Attendee Stream
                  </h3>
                  <p className="text-xs text-gray-400">Live database entries</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search attendee, email, ticket..."
                      value={searchAttendee}
                      onChange={(e) => setSearchAttendee(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <select
                    value={selectedWorkshopFilter}
                    onChange={(e) => setSelectedWorkshopFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="All">All Workshops</option>
                    {workshops.map((w) => (
                      <option key={w.id} value={w.title}>
                        {w.title.slice(0, 30)}...
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredRegistrants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/60 text-xs font-mono uppercase text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="p-4">Ticket Pass</th>
                        <th className="p-4">Attendee Name & Email</th>
                        <th className="p-4">WhatsApp Phone</th>
                        <th className="p-4">College / Organization</th>
                        <th className="p-4">Workshop</th>
                        <th className="p-4">Paid</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRegistrants.map((r) => (
                        <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 font-mono text-xs text-cyan-400 font-semibold">
                            {r.ticketCode}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{r.name}</div>
                            <div className="text-xs text-gray-400">{r.email}</div>
                          </td>
                          <td className="p-4 text-xs font-mono text-gray-300">
                            {r.phone}
                          </td>
                          <td className="p-4 text-xs text-gray-300">
                            {r.organization}
                          </td>
                          <td className="p-4 text-xs text-gray-300 max-w-xs truncate">
                            {r.workshopTitle}
                          </td>
                          <td className="p-4 text-xs font-bold text-emerald-400 font-mono">
                            ₹{r.amount}
                          </td>
                          <td className="p-4 text-xs">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 px-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    No Live Registrations Yet
                  </h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    New attendee registrations and payments made on the website will be recorded and displayed here in real time.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Edit or Create Workshop */}
        {editingWorkshop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="bg-surface border border-white/10 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Edit Workshop Details</h3>
                <button onClick={() => setEditingWorkshop(null)} className="p-1 text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveWorkshop} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Workshop Title</label>
                  <input
                    type="text"
                    required
                    value={editingWorkshop.title}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Subtitle / Scope</label>
                  <textarea
                    rows={2}
                    value={editingWorkshop.subtitle}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Discounted Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={editingWorkshop.discountedPrice}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, discountedPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={editingWorkshop.originalPrice}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Total Seat Cap</label>
                    <input
                      type="number"
                      value={editingWorkshop.totalSeats}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, totalSeats: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Seats Booked</label>
                    <input
                      type="number"
                      value={editingWorkshop.seatsBooked || 0}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, seatsBooked: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Schedule Date</label>
                    <input
                      type="text"
                      value={editingWorkshop.date}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Badge Text (No Emojis)</label>
                    <input
                      type="text"
                      value={editingWorkshop.badge}
                      onChange={(e) => setEditingWorkshop({ ...editingWorkshop, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Google Form Registration Link Configuration */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                      Google Form Registration Link
                    </label>
                    {editingWorkshop.googleFormUrl && (
                      <a
                        href={editingWorkshop.googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-mono"
                      >
                        <span>Test Form Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Paste the Google Form link where user registration data will be collected for this workshop. Clicking &quot;Register via Google Form&quot; on the website redirects users directly to this link.
                  </p>
                  <input
                    type="url"
                    placeholder="https://forms.gle/..."
                    value={editingWorkshop.googleFormUrl || ""}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, googleFormUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-mono placeholder-gray-600"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingWorkshop(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingWorkshop}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md"
                  >
                    {savingWorkshop ? "Saving..." : "Save & Sync to Live Site"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
