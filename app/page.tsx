"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import WorkshopList from "@/components/WorkshopList";
import AboutSection from "@/components/AboutSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SyllabusModal from "@/components/SyllabusModal";
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
      {/* Floating Navbar with Framer Motion Entrance */}
      <Navbar onExploreClick={scrollToWorkshops} />

      {/* Hero with Radiant Horizon Glow & Deep-Tech Workbench Mockup */}
      <Hero
        onExploreClick={scrollToWorkshops}
        settings={siteSettings}
        nextWorkshop={workshops[0]}
      />

      {/* Magic UI Style Infinite Tooling & Partner Marquee */}
      <LogoMarquee />

      {/* Live Workshops Catalog with Roadmap Curriculum & Framer Motion Pill */}
      <WorkshopList
        workshops={workshops}
        onSelectSyllabus={(w) => setSyllabusWorkshop(w)}
        onSelectRegister={handleDirectRegister}
      />

      {/* About MetaQuest & Foundational Mentors (Abhay, Anant, Anamika) */}
      <AboutSection />

      {/* Magic UI Style Bottom Icon Matrix Marquee with Central Floating CTA */}
      <TechStackMarquee onExploreClick={scrollToWorkshops} />

      {/* Dynamic FAQs with Framer Motion Spring Accordion */}
      <FAQSection faqs={siteSettings?.faqs} />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Curriculum / Syllabus Modal */}
      <SyllabusModal
        workshop={syllabusWorkshop}
        onClose={() => setSyllabusWorkshop(null)}
      />
    </main>
  );
}
