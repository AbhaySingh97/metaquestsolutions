"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedStatsBar from "@/components/AnimatedStatsBar";
import LogoMarquee from "@/components/LogoMarquee";
import BentoGrid from "@/components/BentoGrid";
import TerminalShowcase from "@/components/TerminalShowcase";
import WorkshopList from "@/components/WorkshopList";
import HowItWorksTimeline from "@/components/HowItWorksTimeline";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import AboutSection from "@/components/AboutSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SyllabusModal from "@/components/SyllabusModal";
import FloatingRegisterDock from "@/components/FloatingRegisterDock";
import { Workshop, WORKSHOPS_DATA } from "@/data/workshops";
import { SiteSettings } from "@/lib/db";

export default function HomePage() {
  const [syllabusWorkshop, setSyllabusWorkshop] = useState<Workshop | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>(WORKSHOPS_DATA);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | undefined>(undefined);

  // Fetch real-time live site configuration & workshops from database
  const loadSiteData = async () => {
    try {
      const res = await fetch("/api/public/site-data", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.workshops) && data.workshops.length > 0) {
          setWorkshops(data.workshops);
        }
        if (data.siteSettings) {
          setSiteSettings(data.siteSettings);
        }
      }
    } catch (e) {
      console.error("Failed to load live site data:", e);
    }
  };

  useEffect(() => {
    loadSiteData();
  }, []);

  const scrollToWorkshops = () => {
    const el = document.getElementById("workshops");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDirectRegister = (workshop: Workshop) => {
    if (workshop.googleFormUrl) {
      window.open(workshop.googleFormUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Registration Google Form for this workshop is being configured.");
    }
  };

  return (
    <main className="min-h-screen bg-[#070A12] text-gray-100 relative selection:bg-cyan-500 selection:text-black">
      {/* Floating Navbar */}
      <Navbar onExploreClick={scrollToWorkshops} />

      {/* Hero with Radiant Horizon Glow & Live Countdown Timer */}
      <Hero
        onExploreClick={scrollToWorkshops}
        settings={siteSettings}
        nextWorkshop={workshops[0]}
      />

      {/* Component 5: Animated Counter Stats Bar */}
      <AnimatedStatsBar />

      {/* Infinite Tooling & Partner Marquee */}
      <LogoMarquee />

      {/* Component 1: 3D Spotlight Bento Grid */}
      <BentoGrid />

      {/* Component 2: Interactive "Run Code" Terminal Showcase */}
      <TerminalShowcase />

      {/* Live Workshops Catalog */}
      <WorkshopList
        workshops={workshops}
        onSelectSyllabus={(w) => setSyllabusWorkshop(w)}
        onSelectRegister={handleDirectRegister}
      />

      {/* Component 3: Scroll-Linked 4-Step Stepper Timeline */}
      <HowItWorksTimeline onExploreClick={scrollToWorkshops} />

      {/* Component 4: Interactive Comparison Matrix */}
      <ComparisonMatrix />

      {/* Component 6: About MetaQuest & Interactive Mentors */}
      <AboutSection />

      {/* Bottom Tooling Marquee with Central Floating CTA */}
      <TechStackMarquee onExploreClick={scrollToWorkshops} />

      {/* Dynamic FAQs Accordion */}
      <FAQSection faqs={siteSettings?.faqs} />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Curriculum / Syllabus Modal */}
      <SyllabusModal
        workshop={syllabusWorkshop}
        onClose={() => setSyllabusWorkshop(null)}
      />

      {/* Component 7: Floating Sticky Registration Dock */}
      <FloatingRegisterDock
        workshop={workshops[0]}
        settings={siteSettings}
        onRegisterClick={handleDirectRegister}
      />
    </main>
  );
}
