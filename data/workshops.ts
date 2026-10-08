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
