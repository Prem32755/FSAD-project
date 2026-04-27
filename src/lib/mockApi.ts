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
    short: "Transform your home with modern color palettes and premium paint for an instant upgrade.",
    category: "Interior",
    costRange: "Rs. 15,000 - Rs. 30,000",
    roi: "+15% Value",
    duration: "3-5 days",
    impact: "High",
    longDescription: "A comprehensive repaint using washable emulsion, minor surface repair, and two finish coats.",
    materials: [
      { name: "Premium Emulsion 5L", qty: "6 tins", estCost: "Rs. 6,000" },
      { name: "Primer 5L", qty: "2 tins", estCost: "Rs. 1,200" }
    ],
    steps: ["Inspect surfaces", "Prime walls", "Apply finish coats", "Final touch-ups"]
  },
  kitchen: {
    id: "kitchen",
    title: "Modular Kitchen",
    short: "Install a space-efficient modular kitchen with durable finishes and smart storage.",
    category: "Kitchen",
    costRange: "Rs. 80,000 - Rs. 2,00,000",
    roi: "+25% Value",
    duration: "7-10 days",
    impact: "Medium",
    longDescription: "Design and install a modular kitchen with improved storage, countertop space, and better workflow.",
    materials: [
      { name: "Cabinet Modules", qty: "1 set", estCost: "Rs. 60,000" },
      { name: "Quartz Countertop", qty: "6 ft", estCost: "Rs. 25,000" }
    ],
    steps: ["Design signoff", "Manufacture", "Installation", "Final finishing"]
  },
  bathroom: {
    id: "bathroom",
    title: "Bathroom Renovation",
    short: "Upgrade fixtures, tiles, and ventilation for a cleaner and more modern bathroom.",
    category: "Bathroom",
    costRange: "Rs. 40,000 - Rs. 1,00,000",
    roi: "+20% Value",
    duration: "5-7 days",
    impact: "Medium",
    longDescription: "Refresh sanitaryware, fittings, and tiles to improve hygiene, appearance, and long-term durability.",
    materials: [
      { name: "Tiles", qty: "As required", estCost: "Rs. 10,000" },
      { name: "Sanitaryware", qty: "1 set", estCost: "Rs. 15,000" }
    ],
    steps: ["Demolition", "Waterproofing", "Tile installation", "Fixture fitting"]
  }
};

function wait<T>(ms = 600, value?: T) {
  return new Promise<T>((res) => setTimeout(() => res(value as T), ms));
}

const parseJson = <T,>(value: T | string): T => {
  if (typeof value !== "string") return value;
  return JSON.parse(value) as T;
};

const normalizeEnhancement = (item: any): EnhancementDetail => ({
  id: item.id,
  title: item.title,
  short: item.short ?? item.shortDesc,
  category: item.category,
  costRange: item.costRange,
  roi: item.roi,
  duration: item.duration,
  impact: item.impact,
  longDescription: item.longDescription,
  materials: parseJson<Array<{ name: string; qty?: string; estCost?: string }>>(item.materials),
  steps: parseJson<string[]>(item.steps),
});

export const api = {
  listEnhancements: async (): Promise<EnhancementSummary[]> => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const res = await fetch(`${baseUrl}/enhancements`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        short: item.short ?? item.shortDesc,
        category: item.category,
        costRange: item.costRange,
        roi: item.roi,
        duration: item.duration,
        impact: item.impact
      }));
    } catch {
      return wait(500, Object.values(DB).map(({ longDescription, materials, steps, ...summary }) => summary));
    }
  },

  getEnhancement: async (id: string): Promise<EnhancementDetail | null> => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const res = await fetch(`${baseUrl}/enhancements/${id}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return normalizeEnhancement(data);
    } catch {
      return wait(600, DB[id] ?? null);
    }
  },

  requestQuote: async (id: string, payload: { name: string; phone?: string; email?: string }) => {
    console.log("[mockApi] requestQuote", id, payload);
    return wait(800, { ok: true, message: "Quote request received. Our team will contact you within 24 hours." });
  }
};
