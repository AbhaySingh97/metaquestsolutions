export interface Workshop {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "AI/ML" | "IoT & Smart Systems" | "Patents & Research" | "Agritech";
  date: string;
  time: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  totalSeats: number;
  seatsBooked: number;
  featured: boolean;
  badge: string;
  googleFormUrl?: string;
  speakers: {
    name: string;
    role: string;
    organization: string;
  }[];
  overview: string;
  curriculum: {
    module: string;
    title: string;
    duration: string;
    topics: string[];
    speaker: string;
  }[];
  handsOnOutcomes: string[];
  prerequisites: string[];
  toolsProvided: string[];
}

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: "mq-agri-ai-01",
    slug: "ai-in-agriculture-hands-on",
    title: "AI in Agriculture: Smart Precision Farming & Crop ML",
    subtitle: "End-to-End Precision Agriculture with Soil NPK Sensors, Crop Recommendation Algorithms, and ESP32 Edge IoT Integration.",
    category: "Agritech",
    date: "Saturday, Oct 24, 2026",
    time: "10:00 AM - 1:00 PM IST",
    duration: "3 Hours (Live Hands-on)",
    originalPrice: 1499,
    discountedPrice: 499,
    totalSeats: 60,
    seatsBooked: 0,
    featured: true,
    badge: "LIVE WORKSHOP",
    googleFormUrl: "https://forms.gle/metaquest-agri-ai",
    speakers: [
      { name: "Abhay", role: "Senior Applied ML Engineer", organization: "MetaQuest Solutions" },
      { name: "Anant", role: "IoT & Embedded Systems Engineer", organization: "MetaQuest Solutions" },
      { name: "Anamika", role: "AI & ML Research Lead", organization: "MetaQuest Solutions" }
    ],
    overview: "Step beyond basic theoretical machine learning into live, production-grade agricultural AI. This masterclass connects real soil sensor data (N, P, K, pH, Moisture) through IoT pipelines to trained Random Forest and Computer Vision models for crop recommendation, disease detection, and smart irrigation forecasting.",
    curriculum: [
      {
        module: "Module 1",
        title: "Introduction to AI in Precision Agriculture",
        duration: "20 min",
        topics: [
          "Why traditional farming metrics fail under micro-climate variability",
          "Precision farming architecture and automated crop decision engines",
          "Landscape of crop yield prediction and soil health intelligence"
        ],
        speaker: "Anamika"
      },
      {
        module: "Module 2",
        title: "Agricultural Sensor Telemetry & IoT Data Flow",
        duration: "25 min",
        topics: [
          "Soil chemical parameters: Nitrogen (N), Phosphorus (P), Potassium (K), and pH levels",
          "Environmental metrics: Ambient temperature, relative humidity, and rainfall logging",
          "Interfacing ESP32 microcontrollers with industrial agricultural sensor nodes"
        ],
        speaker: "Anant"
      },
      {
        module: "Module 3",
        title: "Machine Learning Algorithms for Crop & Yield Modeling",
        duration: "30 min",
        topics: [
          "Classification vs Regression algorithms in agronomy",
          "Training Random Forest and Gradient Boosted trees on agro-climatic datasets",
          "Handling dataset noise, cross-validation, and preventing model overfitting"
        ],
        speaker: "Anamika"
      },
      {
        module: "Module 4",
        title: "Computer Vision & Edge Disease Detection",
        duration: "25 min",
        topics: [
          "Plant leaf disease detection using Convolutional Neural Networks (CNNs)",
          "Smart automated irrigation triggers via threshold & predictive math",
          "Drone and satellite NDVI spectral indices overview"
        ],
        speaker: "Abhay"
      },
      {
        module: "Module 5",
        title: "Live Case Study: Zero-to-Production Crop Recommendation System",
        duration: "40 min",
        topics: [
          "End-to-end Python pipeline from raw NPK inputs to real-time inference",
          "Connecting the Python ML model with ESP32 REST API telemetry",
          "Generating downloadable farmer advisory reports with confidence metrics"
        ],
        speaker: "Abhay"
      }
    ],
    handsOnOutcomes: [
      "Deploy a working Crop Recommendation ML Model in Python",
      "Understand IoT telemetry serialization from ESP32 to cloud endpoints",
      "Hands-on plant pathology classification with image models",
      "Verified MetaQuest Certificate of Research Completion"
    ],
    prerequisites: ["Basic Python familiarity", "Curiosity about Real-World AI and IoT applications"],
    toolsProvided: ["Jupyter Notebooks", "Curated Agro Datasets", "ESP32 Code Snippets", "Digital Certificate"]
  },
  {
    id: "mq-traffic-ai-02",
    slug: "density-based-traffic-light-ai-iot",
    title: "Autonomous Density-Based Traffic Systems using AI/ML & IoT",
    subtitle: "Overcoming Prior Art: Spatial Occupancy Index (SOI), IRC PCU Weighting, and Zero-Trust Emergency Preemption.",
    category: "AI/ML",
    date: "Sunday, Nov 01, 2026",
    time: "2:00 PM - 5:30 PM IST",
    duration: "3.5 Hours",
    originalPrice: 1999,
    discountedPrice: 699,
    totalSeats: 50,
    seatsBooked: 0,
    featured: true,
    badge: "HIGH DEMAND",
    googleFormUrl: "https://forms.gle/metaquest-traffic-ai",
    speakers: [
      { name: "Abhay", role: "Computer Vision & Autonomous Systems", organization: "MetaQuest Solutions" },
      { name: "Anant", role: "Edge Hardware & IoT Architecture", organization: "MetaQuest Solutions" },
      { name: "Anamika", role: "Algorithmic Modeling Lead", organization: "MetaQuest Solutions" }
    ],
    overview: "Most hobbyist traffic systems use naive Haar Cascades and fixed delay loops that fail completely in heterogeneous traffic. In this masterclass, discover patent-grade traffic engineering: Spatial Volumetric Occupancy, IRC PCU factor weighting, and cryptographically verified emergency vehicle preemption handshakes.",
    curriculum: [
      {
        module: "Module 1",
        title: "Audit of Prior Art & Failure Modes of Legacy Systems",
        duration: "30 min",
        topics: [
          "Why bounding box counts fail in mixed-traffic (4 two-wheelers vs 1 bus)",
          "RF replay attacks and vulnerable 27MHz/433MHz emergency triggers",
          "Single-junction myopia vs multi-intersection coordinated green corridors"
        ],
        speaker: "MetaQuest Lead"
      },
      {
        module: "Module 2",
        title: "Spatial Volumetric Occupancy & PCU Calibration",
        duration: "45 min",
        topics: [
          "Mathematical modeling of Spatial Occupancy Index (SOI)",
          "Indian Road Congress (IRC) Passenger Car Unit weight matrix",
          "Real-time polygon lane segmentation using YOLOv8"
        ],
        speaker: "MetaQuest Lead"
      },
      {
        module: "Module 3",
        title: "Zero-Trust Vehicle-to-Infrastructure (V2I) Cryptographic Handshake",
        duration: "45 min",
        topics: [
          "Ephemeral token exchange: preventing unauthorized signal preemption",
          "Trajectory vector dot-product calculation for directional validation",
          "Failsafe fallback and Industrial Safety Integrity Levels (SIL)"
        ],
        speaker: "MetaQuest Lead"
      },
      {
        module: "Module 4",
        title: "Hands-on Edge Hardware Architecture & Simulation",
        duration: "60 min",
        topics: [
          "Interfacing Jetson/Raspberry Pi edge cameras with traffic microcontrollers",
          "Non-blocking state-machine firmware (zero delay loops)",
          "Live corridor simulation and benchmark metrics"
        ],
        speaker: "MetaQuest Lead"
      }
    ],
    handsOnOutcomes: [
      "Understand multi-modal PCU traffic density calculation",
      "Implement a zero-trust cryptographic handshake simulation in Python",
      "Design non-blocking microcontroller state machines for safety-critical hardware"
    ],
    prerequisites: ["Basic programming skills in Python or C++"],
    toolsProvided: ["YOLOv8 Lane Weights", "Python Traffic Simulator", "Architecture Reference Blueprint"]
  },
  {
    id: "mq-patent-03",
    slug: "patent-novelty-and-grant-drafting",
    title: "Patent Novelty Formulation & Tech Grant Proposal Masterclass",
    subtitle: "Transforming Student & Research Prototypes into Commercial-Grade Patents and Non-Dilutive Government Grants.",
    category: "Patents & Research",
    date: "Saturday, Nov 07, 2026",
    time: "11:00 AM - 2:00 PM IST",
    duration: "3 Hours",
    originalPrice: 2499,
    discountedPrice: 799,
    totalSeats: 40,
    seatsBooked: 0,
    featured: true,
    badge: "PATENT ESSENTIAL",
    googleFormUrl: "https://forms.gle/metaquest-patents",
    speakers: [
      { name: "Abhay", role: "Applied Research & Novelty Formulation", organization: "MetaQuest Solutions" },
      { name: "Anant", role: "Hardware Enablement & Systems", organization: "MetaQuest Solutions" },
      { name: "Anamika", role: "R&D Grant & IP Strategy Lead", organization: "MetaQuest Solutions" }
    ],
    overview: "Most tech projects get rejected by patent offices because they claim obvious assemblies of commercial off-the-shelf components. Learn the exact framework for formulating native mathematical novelty, drafting defensible claims, navigating prior art audits, and securing non-dilutive government R&D grants.",
    curriculum: [
      {
        module: "Module 1",
        title: "Deconstructing Prior Art & Finding Defensible Novelty",
        duration: "35 min",
        topics: [
          "The difference between engineering execution and patentable invention",
          "Auditing patent databases (Google Patents, USPTO, InPASS) effectively",
          "Avoiding the 'obvious combination of prior art' 35 U.S.C. 103 trap"
        ],
        speaker: "IP Faculty"
      },
      {
        module: "Module 2",
        title: "Formulating Native Mathematical Models & Algorithms",
        duration: "45 min",
        topics: [
          "Translating software logic into algorithmic patent claims",
          "Writing mathematical proofs and formal system representations",
          "Case study: Novelty claims in IoT, Edge AI, and Smart City devices"
        ],
        speaker: "IP Faculty"
      },
      {
        module: "Module 3",
        title: "Anatomy of a Complete Patent Specification",
        duration: "45 min",
        topics: [
          "Drafting Independent and Dependent Claims with precision",
          "System diagrams, flowcharts, and hardware enablement requirements",
          "Provisional vs Complete Specifications and international PCT timelines"
        ],
        speaker: "IP Faculty"
      },
      {
        module: "Module 4",
        title: "Winning Non-Dilutive Government Research Grants",
        duration: "35 min",
        topics: [
          "Structuring grant proposals for DST, BIRAC, MeitY, and MSME schemes",
          "Budgeting R&D line items, deliverables, and commercialization milestones"
        ],
        speaker: "IP Faculty"
      }
    ],
    handsOnOutcomes: [
      "Review sample patent disclosure dossiers and claim structures",
      "Perform a live prior art novelty search and clearance audit",
      "Download MetaQuest's proprietary Patent & Grant Proposal Template"
    ],
    prerequisites: ["Open to engineering students, PhD scholars, startup founders, and researchers"],
    toolsProvided: ["Patent Claim Templates", "Grant Proposal Outline", "Prior Art Search Matrix"]
  },
  {
    id: "mq-greenbinx-04",
    slug: "greenbinx-smart-iot-waste-segregation",
    title: "GreenBinX: Smart IoT Automated Waste Segregation Architecture",
    subtitle: "Hardware Sensing, Optical Inductive Classification, and Smart City IoT Municipal Telemetry.",
    category: "IoT & Smart Systems",
    date: "Sunday, Nov 15, 2026",
    time: "3:00 PM - 6:00 PM IST",
    duration: "3 Hours",
    originalPrice: 1699,
    discountedPrice: 549,
    totalSeats: 45,
    seatsBooked: 0,
    featured: false,
    badge: "SMART CITY",
    googleFormUrl: "https://forms.gle/metaquest-greenbinx",
    speakers: [
      { name: "Abhay", role: "Computer Vision & Optical Sorting", organization: "MetaQuest Solutions" },
      { name: "Anant", role: "Embedded Firmware & Actuation Control", organization: "MetaQuest Solutions" },
      { name: "Anamika", role: "Smart City Telemetry & Analytics", organization: "MetaQuest Solutions" }
    ],
    overview: "A deep dive into GreenBinX — an intelligent waste segregation station integrating inductive proximity sensors, capacitive moisture sensors, optical cameras, and automated mechanical flap diverters with cloud dashboard monitoring.",
    curriculum: [
      {
        module: "Module 1",
        title: "Sensor Array Architecture for Waste Characterization",
        duration: "40 min",
        topics: [
          "Metallic vs Non-metallic classification via inductive sensors",
          "Dry vs Wet waste moisture sensing heuristics",
          "Ultrasonic bin fill-level depth sensing and tilt alerts"
        ],
        speaker: "IoT Architect"
      },
      {
        module: "Module 2",
        title: "Actuation & Mechanical Sorting Control",
        duration: "45 min",
        topics: [
          "Servo and stepper motor actuation algorithms",
          "Anti-jamming current sensing and auto-clearing routines",
          "Power-saving sleep states for solar-powered municipal installations"
        ],
        speaker: "IoT Architect"
      },
      {
        module: "Module 3",
        title: "Cloud Telemetry & Smart City Municipal Dashboard",
        duration: "50 min",
        topics: [
          "MQTT / HTTP telemetry to cloud databases",
          "Route optimization for garbage collection fleets using fill-level telemetry",
          "Building a live real-time dashboard"
        ],
        speaker: "IoT Architect"
      }
    ],
    handsOnOutcomes: [
      "Master multi-sensor fusion for real-world automated sorting",
      "Deploy an MQTT telemetry listener in Python",
      "Access schematic diagrams and firmware blueprints"
    ],
    prerequisites: ["Basic electronics or coding enthusiasm"],
    toolsProvided: ["Circuit Schematics", "ESP32 C++ Code", "IoT Dashboard Repo"]
  }
];

export const TESTIMONIALS_DATA = [
  {
    quote: "The AI in Agriculture workshop was phenomenal. Instead of just showing standard scikit-learn notebooks, they connected live ESP32 soil data with real crop recommendation and disease models. It inspired our final-year project!",
    author: "Rohan Sharma",
    role: "B.Tech Final Year, Computer Science",
    institution: "IIT Roorkee",
    rating: 5
  },
  {
    quote: "MetaQuest's Patent Masterclass completely changed our approach. The breakdown of prior-art traps and native mathematical formulations allowed our team to draft our first provisional patent successfully.",
    author: "Dr. Priyanshu Verma",
    role: "Associate Professor & R&D Lead",
    institution: "Tech Innovation Hub",
    rating: 5
  },
  {
    quote: "Density-Based Traffic Light system workshop solved the exact problems we faced in our smart city hackathon. Learning about Spatial Occupancy Index and non-blocking firmware was pure gold.",
    author: "Megha S.",
    role: "IoT Research Scholar",
    institution: "NIT Trichy",
    rating: 5
  }
];

export const RESEARCH_STATS = [
  { label: "Active Researchers & Learners", value: "1,200+", detail: "Across 45+ premier institutions" },
  { label: "Deep-Tech Workshops Hosted", value: "24+", detail: "Covering AI, IoT, Agritech & Patents" },
  { label: "Patents & Grants Mentored", value: "18+", detail: "Novel inventions & research proposals" },
  { label: "Participant Satisfaction", value: "4.95 / 5", detail: "Based on 850+ post-workshop reviews" }
];
