// src/lib/mockApi.ts
export type EnhancementSummary = {
  id: string;
  title: string;
  short: string;
  category: string;
  costRange: string;
  roi: string;
  duration: string;
  impact: "High" | "Medium" | "Long Term";
};

export type EnhancementDetail = EnhancementSummary & {
  longDescription: string;
  materials: Array<{ name: string; qty?: string; estCost?: string }>;
  steps: string[];
};

const DB: Record<string, EnhancementDetail> = {
  paint: {
    id: "paint",
    title: "Fresh Interior Paint",
    short: "Transform your home with modern color palettes and premium paint for instant visual upgrade.",
    category: "Interior",
    costRange: "₹15,000 - ₹30,000",
    roi: "+15% Value",
    duration: "3-5 days",
    impact: "High",
    longDescription:
      "A comprehensive interior repaint using premium washable emulsion. Includes minor surface repair, priming and two finish coats.",
    materials: [
      { name: "Premium Emulsion 5L", qty: "6 tins", estCost: "₹6,000" },
      { name: "Primer 5L", qty: "2 tins", estCost: "₹1,200" },
      { name: "Putty & Sandpaper", qty: "set", estCost: "₹800" },
      { name: "Labor & Masking", qty: "lump-sum", estCost: "₹6,000" }
    ],
    steps: [
      "Inspect surfaces & minor repairs",
      "Sanding & priming",
      "Apply two finish coats",
      "Final touch ups & clean"
    ]
  },

  led: {
    id: "led",
    title: "LED Lighting Upgrade",
    short: "Replace bulbs with energy-efficient LED fixtures and smart switches.",
    category: "Electrical",
    costRange: "₹8,000 - ₹20,000",
    roi: "+10% Value",
    duration: "1-2 days",
    impact: "High",
    longDescription:
      "Upgrading to LED fixtures and smart dimmers reduces energy use and modernizes interiors. Includes wiring checks and fitting.",
    materials: [
      { name: "LED Bulbs (9W)", qty: "10 pcs", estCost: "₹1,200" },
      { name: "LED Downlights", qty: "6 pcs", estCost: "₹6,000" },
      { name: "Smart Switch Module", qty: "2 pcs", estCost: "₹1,000" }
    ],
    steps: ["Electrical safety checks", "Replace fixtures", "Program smart switches", "Testing"]
  },

  kitchen: {
    id: "kitchen",
    title: "Modular Kitchen",
    short: "Install a space-efficient modular kitchen with durable finishes and smart storage.",
    category: "Kitchen",
    costRange: "₹80,000 - ₹2,00,000",
    roi: "+25% Value",
    duration: "7-10 days",
    impact: "Medium",
    longDescription:
      "Design, manufacture and install a modular kitchen with cabinets, countertops and plumbing adjustments.",
    materials: [
      { name: "Cabinet Modules", qty: "set", estCost: "₹60,000" },
      { name: "Quartz Countertop", qty: "6 ft", estCost: "₹25,000" },
      { name: "Hardware (hinges)", qty: "set", estCost: "₹5,000" }
    ],
    steps: ["Design signoff", "Manufacture", "Installation", "Plumbing & finishing"]
  },

  bathroom: {
    id: "bathroom",
    title: "Bathroom Renovation",
    short: "Upgrade fixtures, tiles and add better ventilation for durable and modern bathrooms.",
    category: "Bathroom",
    costRange: "₹40,000 - ₹1,00,000",
    roi: "+20% Value",
    duration: "5-7 days",
    impact: "Medium",
    longDescription:
      "Replace tiles, fittings and install modern sanitaryware for improved aesthetics and function.",
    materials: [
      { name: "Tiles", qty: "per sq.ft", estCost: "₹10,000" },
      { name: "Sanitaryware", qty: "set", estCost: "₹15,000" },
      { name: "Plumbing & labor", qty: "lump-sum", estCost: "₹10,000" }
    ],
    steps: ["Demolition", "Plumbing works", "Tile & fixture installation", "Finishing"]
  },

  solar: {
    id: "solar",
    title: "Solar Panel Installation",
    short: "Rooftop solar to reduce electricity bills and add long-term value.",
    category: "Sustainable",
    costRange: "₹1,00,000 - ₹3,00,000",
    roi: "+30% Value",
    duration: "2-3 days",
    impact: "Long Term",
    longDescription:
      "Install rooftop solar PV system with inverter and monitoring for energy savings and sustainability.",
    materials: [
      { name: "PV Modules", qty: "4-8 panels", estCost: "₹1,20,000" },
      { name: "Inverter & mount", qty: "set", estCost: "₹40,000" },
      { name: "Wiring & protection", qty: "lot", estCost: "₹10,000" }
    ],
    steps: ["Survey & load analysis", "Mounting panels", "Electrical hookup", "Commissioning"]
  },

  balcony: {
    id: "balcony",
    title: "Balcony Garden Setup",
    short: "Create a green balcony with planters, soil beds and seating for a pleasant space.",
    category: "Exterior",
    costRange: "₹5,000 - ₹15,000",
    roi: "+12% Value",
    duration: "1-2 days",
    impact: "High",
    longDescription:
      "Design and install planters, soil systems and simple seating to create an aesthetic balcony garden.",
    materials: [
      { name: "Planters & soil", qty: "set", estCost: "₹4,000" },
      { name: "Plants (assorted)", qty: "10-15", estCost: "₹3,000" },
      { name: "Seating & accessories", qty: "small", estCost: "₹3,000" }
    ],
    steps: ["Design", "Purchase & planting", "Finish & watering setup"]
  },

  flooring: {
    id: "flooring",
    title: "Flooring Upgrade",
    short: "Replace worn flooring with durable tiles or vinyl for better aesthetics and durability.",
    category: "Interior",
    costRange: "₹25,000 - ₹80,000",
    roi: "+18% Value",
    duration: "3-5 days",
    impact: "Medium",
    longDescription:
      "Remove existing floor where necessary and lay new tiles/vinyl with skirting and finishing.",
    materials: [
      { name: "Tiles / Vinyl", qty: "per sq.ft", estCost: "₹30,000" },
      { name: "Adhesive & grout", qty: "lot", estCost: "₹3,000" },
      { name: "Labor", qty: "lump-sum", estCost: "₹10,000" }
    ],
    steps: ["Prepare subfloor", "Lay new flooring", "Grouting & finishing"]
  },

  doors_windows: {
    id: "doors_windows",
    title: "Doors & Window Upgrade",
    short: "Replace old doors/windows with insulated, secure, and modern frames to improve comfort.",
    category: "Exterior",
    costRange: "₹20,000 - ₹80,000",
    roi: "+14% Value",
    duration: "2-4 days",
    impact: "Medium",
    longDescription:
      "Install new frames, glazing or shutters for better insulation, security and visual appeal.",
    materials: [
      { name: "Window frames & glass", qty: "set", estCost: "₹30,000" },
      { name: "Door panels & locks", qty: "set", estCost: "₹25,000" }
    ],
    steps: ["Measure & order", "Remove old frames", "Install new & seal"]
  }
};

function wait<T>(ms = 600, value?: T) {
  return new Promise<T>((res) => setTimeout(() => res(value as T), ms));
}

export const api = {
  listEnhancements: async (): Promise<EnhancementSummary[]> => {
    return wait(500, Object.values(DB).map(d => ({
      id: d.id,
      title: d.title,
      short: d.short,
      category: d.category,
      costRange: d.costRange,
      roi: d.roi,
      duration: d.duration,
      impact: d.impact
    })));
  },

  getEnhancement: async (id: string): Promise<EnhancementDetail | null> => {
    return wait(600, DB[id] ?? null);
  },

  requestQuote: async (id: string, payload: { name: string; phone?: string; email?: string }) => {
    console.log("[mockApi] requestQuote", id, payload);
    return wait(800, { ok: true, message: "Quote request received. Our team will contact you within 24 hours." });
  }
};
