import React from "react";
import EnhancementCard from "@/components/EnhancementCard";

import { ChefHat, Bath, Paintbrush, Leaf, Zap } from "lucide-react";

/* categories data */
const categories = [
  {
    id: "kitchen",
    title: "Modular Kitchen",
    short: "Modular designs, better storage, chimney & energy-saving appliances.",
    costRange: "₹80,000 - ₹2,00,000",
    roi: "+25% Value",
    duration: "7-10 days",
    category: "Kitchen",
    impact: "medium",
    icon: ChefHat
  },
  {
    id: "bath",
    title: "Bathroom Renovation",
    short: "Anti-slip tiles, geysers, modern fittings, waterproofing for durability.",
    costRange: "₹40,000 - ₹1,00,000",
    roi: "+20% Value",
    duration: "5-7 days",
    category: "Bathroom",
    impact: "medium",
    icon: Bath
  },
  {
    id: "solar",
    title: "Solar Panel Installation",
    short: "Rooftop solar to reduce electricity bills and add long-term value.",
    costRange: "₹1,00,000 - ₹3,00,000",
    roi: "+30% Value",
    duration: "2-3 days",
    category: "Sustainable",
    impact: "low",
    icon: Leaf
  },
  {
    id: "balcony",
    title: "Balcony Garden Setup",
    short: "Create a green balcony with planters, soil beds and seating for a pleasant space.",
    costRange: "₹5,000 - ₹15,000",
    roi: "+12% Value",
    duration: "1-2 days",
    category: "Exterior",
    impact: "high",
    icon: Paintbrush
  },
  {
    id: "flooring",
    title: "Flooring Upgrade",
    short: "Replace worn flooring with durable tiles or vinyl for better aesthetics and durability.",
    costRange: "₹25,000 - ₹80,000",
    roi: "+18% Value",
    duration: "3-5 days",
    category: "Interior",
    impact: "medium",
    icon: Zap
  }
];

export const EnhancementCategories: React.FC = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Explore Upgrade <span className="text-gradient-primary">Categories</span></h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Comprehensive improvement solutions organized by area to help you prioritize and plan your home enhancement journey.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {categories.map((c) => (
            <EnhancementCard
              key={c.id}
              id={c.id}
              title={c.title}
              short={c.short}
              cost={c.costRange}
              roi={c.roi}
              duration={c.duration}
              category={c.category}
              priority={c.impact as "high" | "medium" | "low"}
              compact
              onLearnMore={() => {
                // simple demo behaviour - open modal or route, implement as needed
                // e.g., setSelectedId(c.id) if you export setter from parent, or console log
                console.log("Learn more clicked", c.id);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancementCategories;
