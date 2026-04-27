import React, { useEffect, useState } from "react";
import EnhancementCard from "@/components/EnhancementCard";
import { api, EnhancementSummary } from "@/lib/mockApi";
import { EnhancementModal } from "@/components/EnhancementModal";
import { Button } from "@/components/ui/button";

export const RecommendationsSection: React.FC = () => {
  const [items, setItems] = useState<EnhancementSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let mounted = true;
    api.listEnhancements().then((res) => {
      if (!mounted) return;
      setItems(res);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="py-20 text-center">Loading recommendations...</div>;

  const featured = items.slice(0, 3);
  const preview = items.slice(3, 6);
  const lower = items.slice(6);

  return (
    <section id="recommendations" className="bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
            Popular Home <span className="text-gradient-primary">Value Enhancements</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Curated picks at top, a short catalog preview, and the full recommendation list below.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {featured.map((item) => (
            <EnhancementCard
              key={item.id}
              id={item.id}
              title={item.title}
              short={item.short}
              cost={item.costRange}
              roi={item.roi}
              duration={item.duration}
              category={item.category}
              priority={item.impact === "High" ? "high" : item.impact === "Medium" ? "medium" : "low"}
              onLearnMore={(id) => setSelectedId(id || null)}
            />
          ))}
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Full Catalog</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {preview.map((item) => (
              <EnhancementCard
                key={`preview-${item.id}`}
                id={item.id}
                title={item.title}
                short={item.short}
                cost={item.costRange}
                roi={item.roi}
                duration={item.duration}
                category={item.category}
                priority={item.impact === "High" ? "high" : item.impact === "Medium" ? "medium" : "low"}
                compact
                onLearnMore={(id) => setSelectedId(id || null)}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">More Enhancements</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lower.slice(0, visibleCount).map((item) => (
              <EnhancementCard
                key={`more-${item.id}`}
                id={item.id}
                title={item.title}
                short={item.short}
                cost={item.costRange}
                roi={item.roi}
                duration={item.duration}
                category={item.category}
                priority={item.impact === "High" ? "high" : item.impact === "Medium" ? "medium" : "low"}
                onLearnMore={(id) => setSelectedId(id || null)}
              />
            ))}
          </div>
        </div>

        {lower.length > visibleCount && (
          <div className="text-center">
            <Button onClick={() => setVisibleCount((count) => count + 3)} className="btn-hero">
              View More
            </Button>
          </div>
        )}

        {selectedId && <EnhancementModal id={selectedId} onClose={() => setSelectedId(null)} />}
      </div>
    </section>
  );
};

export default RecommendationsSection;
