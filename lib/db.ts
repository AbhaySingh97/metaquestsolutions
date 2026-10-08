import fs from "fs";
import path from "path";
import { WORKSHOPS_DATA, Workshop } from "@/data/workshops";

const DB_FILE = path.join(process.cwd(), "data", "db.json");

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
    "Bridge academic theory and real-world deployment. Master Precision AI in Agriculture, Autonomous Smart Traffic Systems, GreenBinX IoT, and Patent Novelty Formulation with hands-on researchers.",
  nextCohortDate: "2026-10-24T10:00:00",
  metrics: [
    {
      id: "m-1",
      label: "Live Cohorts",
      value: "4 Active Batches",
      detail: "AI, Smart IoT, Agritech & Patents",
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
      q: "How do I receive the workshop link and digital ticket after paying through Razorpay?",
      a: "Immediately upon successful payment via Razorpay (UPI, Card, Netbanking), you will see your digital pass on the screen with a unique ticket code. A copy along with the calendar invite and Google Meet link will be instantly sent to your registered email address.",
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
      q: "Can I get a refund if my schedule changes?",
      a: "We offer a 100% no-questions-asked refund if requested at least 24 hours prior to the scheduled workshop start time. Simply email us with your Ticket ID.",
    },
  ],
};

function ensureDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = {
        siteSettings: DEFAULT_SETTINGS,
        workshops: WORKSHOPS_DATA,
        registrations: [],
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!parsed.siteSettings) parsed.siteSettings = DEFAULT_SETTINGS;
    if (!parsed.workshops || parsed.workshops.length === 0) parsed.workshops = WORKSHOPS_DATA;
    if (!parsed.registrations) parsed.registrations = [];
    return parsed;
  } catch (error) {
    console.error("Database read error:", error);
    return {
      siteSettings: DEFAULT_SETTINGS,
      workshops: WORKSHOPS_DATA,
      registrations: [],
    };
  }
}

function saveDb(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Database write error:", error);
  }
}

// Get everything for public site
export function getFullDb(): DatabaseSchema {
  return ensureDb();
}

// Settings methods
export function getSiteSettings(): SiteSettings {
  return ensureDb().siteSettings;
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = ensureDb();
  db.siteSettings = { ...db.siteSettings, ...settings };
  saveDb(db);
  return db.siteSettings;
}

// Workshops methods
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

// Registration methods
export function getRealRegistrations(): StoredRegistration[] {
  return ensureDb().registrations;
}

export function addRealRegistration(reg: StoredRegistration) {
  const db = ensureDb();
  db.registrations.unshift(reg);

  // Increment real seat count for the booked workshop
  const w = db.workshops.find((item) => item.id === reg.workshopId);
  if (w) {
    w.seatsBooked = (w.seatsBooked || 0) + 1;
  }

  saveDb(db);
  return reg;
}
