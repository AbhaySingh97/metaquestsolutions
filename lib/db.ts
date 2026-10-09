import fs from "fs";
import path from "path";
import os from "os";
import { WORKSHOPS_DATA, Workshop } from "@/data/workshops";

const DB_FILE = path.join(process.cwd(), "data", "db.json");
const TMP_DB_FILE = path.join(os.tmpdir(), "metaquest_db.json");

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface SiteSettings {
  announcement: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtitle: string;
  nextCohortDate: string;
  metrics: MetricItem[];
  faqs: FAQItem[];
}

export interface StoredRegistration {
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

export interface DatabaseSchema {
  siteSettings: SiteSettings;
  workshops: Workshop[];
  registrations: StoredRegistration[];
}

const DEFAULT_SETTINGS: SiteSettings = {
  announcement: "Next Live Cohort Enrolling Now | Live Mentorship + Certificate",
  heroHeadline: "Pioneering Tomorrow with",
  heroHighlight: "Deep Tech",
  heroSubtitle:
    "Bridge academic theory and real-world deployment. Master Applied AI, Embedded IoT Telemetry, Edge Computer Vision, and Patent Novelty Formulation with hands-on researchers.",
  nextCohortDate: "2026-10-24T10:00:00+05:30",
  metrics: [
    {
      id: "m-1",
      label: "Live Cohorts",
      value: "1 Active Batch",
      detail: "Applied AI, Embedded IoT & Patents",
    },
    {
      id: "m-2",
      label: "Interactive Mentorship",
      value: "100% Live Hands-On",
      detail: "Direct interaction and screen-sharing",
    },
    {
      id: "m-3",
      label: "Real Deliverables",
      value: "Code & Datasets",
      detail: "ESP32 code, datasets & notebooks",
    },
    {
      id: "m-4",
      label: "Verified Credentials",
      value: "Digital Pass & Certificate",
      detail: "Authenticated completion certificate",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      q: "How do I register and receive the workshop Google Meet link?",
      a: "Click 'Register via Google Form' on the workshop card. Complete the short registration form with your contact details. You will receive an automated confirmation email along with the Google Meet calendar invite and meeting link.",
    },
    {
      id: "faq-2",
      q: "Will I receive session recordings and code assets if I can't attend live?",
      a: "Yes! All registered participants receive lifetime access to the complete session recording, curated Jupyter notebooks, ESP32 code snippets, and research paper templates within 24 hours of the workshop.",
    },
    {
      id: "faq-3",
      q: "Is a verified certificate of completion provided?",
      a: "Yes. Every attendee receives an authenticated digital Certificate of Research Completion issued by MetaQuest Solutions, complete with a verification QR code suitable for LinkedIn and academic resumes.",
    },
    {
      id: "faq-4",
      q: "Are the workshops purely theoretical or hands-on?",
      a: "Every MetaQuest workshop is built around practical execution. You will run code, evaluate real models, inspect hardware schematics, and understand the real failure modes that academic papers omit.",
    },
    {
      id: "faq-5",
      q: "How are the live interactive sessions conducted?",
      a: "All live workshops are hosted on Google Meet with interactive screen-sharing, live debugging, and dedicated Q&A breakout sessions directly with the mentors.",
    },
  ],
};

declare global {
  var __metaquest_db: DatabaseSchema | undefined;
}

// Helper to commit changes directly to GitHub repository (persists across all Vercel instances)
async function syncToGitHub(data: DatabaseSchema) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "AbhaySingh97/metaquestsolutions";
  if (!token) return;

  try {
    const url = `https://api.github.com/repos/${repo}/contents/data/db.json`;
    const getRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "MetaQuest-Admin-Sync",
      },
      cache: "no-store",
    });

    let sha = "";
    if (getRes.ok) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    const contentStr = JSON.stringify(data, null, 2);
    const base64Content = Buffer.from(contentStr).toString("base64");

    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "MetaQuest-Admin-Sync",
      },
      body: JSON.stringify({
        message: "Admin CMS sync: updated db.json",
        content: base64Content,
        sha: sha || undefined,
      }),
    });
  } catch (err) {
    console.error("GitHub API sync error:", err);
  }
}

function ensureDb(): DatabaseSchema {
  // 1. In-memory hot cache
  if (globalThis.__metaquest_db) {
    return globalThis.__metaquest_db;
  }

  // 2. Writable /tmp filesystem (Vercel serverless)
  if (fs.existsSync(TMP_DB_FILE)) {
    try {
      const raw = fs.readFileSync(TMP_DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.workshops)) {
        globalThis.__metaquest_db = parsed;
        return parsed;
      }
    } catch (e) {
      console.warn("Failed reading tmp db:", e);
    }
  }

  // 3. Local build file
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (!parsed.siteSettings) parsed.siteSettings = DEFAULT_SETTINGS;
      if (!parsed.workshops) parsed.workshops = WORKSHOPS_DATA;
      if (!parsed.registrations) parsed.registrations = [];

      globalThis.__metaquest_db = parsed;
      return parsed;
    } catch (error) {
      console.error("Database read error:", error);
    }
  }

  const initial: DatabaseSchema = {
    siteSettings: DEFAULT_SETTINGS,
    workshops: WORKSHOPS_DATA,
    registrations: [],
  };
  globalThis.__metaquest_db = initial;
  return initial;
}

function saveDb(data: DatabaseSchema) {
  // Update in-memory hot cache
  globalThis.__metaquest_db = data;

  // 1. Attempt writing to local DB_FILE (local dev)
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Expected on Vercel read-only filesystem
  }

  // 2. Always write to writable /tmp filesystem (Vercel runtime)
  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed writing to tmp db:", e);
  }

  // 3. Background sync to GitHub repository (permanent cloud persistence)
  syncToGitHub(data).catch(() => {});
}

// Public getters
export function getFullDb(): DatabaseSchema {
  return ensureDb();
}

export function getSiteSettings(): SiteSettings {
  return ensureDb().siteSettings;
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = ensureDb();
  db.siteSettings = { ...db.siteSettings, ...settings };
  saveDb(db);
  return db.siteSettings;
}

export function getWorkshops(): Workshop[] {
  return ensureDb().workshops;
}

export function saveWorkshop(workshop: Workshop): Workshop[] {
  const db = ensureDb();
  const idx = db.workshops.findIndex((w) => w.id === workshop.id);
  if (idx >= 0) {
    db.workshops[idx] = workshop;
  } else {
    db.workshops.unshift(workshop);
  }
  saveDb(db);
  return db.workshops;
}

export function deleteWorkshop(id: string): Workshop[] {
  const db = ensureDb();
  db.workshops = db.workshops.filter((w) => w.id !== id);
  saveDb(db);
  return db.workshops;
}

export function getRealRegistrations(): StoredRegistration[] {
  return ensureDb().registrations;
}

export function addRealRegistration(reg: StoredRegistration) {
  const db = ensureDb();
  db.registrations.unshift(reg);

  const w = db.workshops.find((item) => item.id === reg.workshopId);
  if (w) {
    w.seatsBooked = (w.seatsBooked || 0) + 1;
  }

  saveDb(db);
  return reg;
}
