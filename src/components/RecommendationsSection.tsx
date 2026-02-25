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
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="py-20 text-center">Loading recommendations…</div>;

  // split: featured (0-2), preview (3-5), lower (6+)
  const featured = items.slice(0, 3);
  const preview = items.slice(3, 6);
  const lower = items.slice(6);

  return (
    <section id="recommendations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Popular Home <span className="text-gradient-primary">Value Enhancements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Curated picks at top, a short catalog preview, and full catalog below.
          </p>
        </div>

        {/* featured row */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featured.map((f) => (
            <EnhancementCard
              key={f.id}
              id={f.id}
              title={f.title}
              short={f.short}
              cost={f.costRange}
              roi={f.roi}
              duration={f.duration}
              category={f.category}
              priority={f.impact === "High" ? "high" : f.impact === "Medium" ? "medium" : "low"}
              onLearnMore={(id) => setSelectedId(id || null)}
            />
          ))}
        </div>

        {/* preview (Full Catalog) — now uses EnhancementCard compact for consistent look */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Full Catalog</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {preview.map((p) => (
              <EnhancementCard
                key={`prev-${p.id}`}
                id={p.id}
                title={p.title}
                short={p.short}
                cost={p.costRange}
                roi={p.roi}
                duration={p.duration}
                category={p.category}
                priority={p.impact === "High" ? "high" : p.impact === "Medium" ? "medium" : "low"}
                compact
                onLearnMore={(id) => setSelectedId(id || null)}
              />
            ))}
          </div>
        </div>

        {/* lower grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">More Enhancements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lower.slice(0, visibleCount).map((l) => (
              <EnhancementCard
                key={`lower-${l.id}`}
                id={l.id}
                title={l.title}
                short={l.short}
                cost={l.costRange}
                roi={l.roi}
                duration={l.duration}
                category={l.category}
                priority={l.impact === "High" ? "high" : l.impact === "Medium" ? "medium" : "low"}
                onLearnMore={(id) => setSelectedId(id || null)}
              />
            ))}
          </div>
        </div>

        {lower.length > visibleCount && (
          <div className="text-center">
            <Button onClick={() => setVisibleCount((v) => v + 3)} className="btn-hero">
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
