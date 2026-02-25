// src/components/EnhancementModal.tsx
import React, { useEffect, useState } from "react";
import { api, EnhancementDetail } from "@/lib/mockApi";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Props = {
  id: string;
  onClose: () => void;
};

export const EnhancementModal: React.FC<Props> = ({ id, onClose }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<EnhancementDetail | null>(null);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getEnhancement(id).then((d) => {
      if (!mounted) return;
      setDetail(d);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [id]);

  const handleRequestQuote = async () => {
    if (!detail) return;
    setRequesting(true);
    const res = await api.requestQuote(detail.id, { name: "Demo User", email: "demo@example.com" });
    setRequesting(false);
    toast({
      title: res.ok ? "Request sent" : "Request failed",
      description: res.message,
    });
    if (res.ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto p-6 z-10">
        <button className="absolute right-4 top-4 text-gray-600" onClick={onClose}><X /></button>

        {loading ? (
          <div className="py-20 text-center">Loading…</div>
        ) : detail ? (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{detail.title}</h2>
                <div className="text-sm text-muted-foreground">{detail.impact} • {detail.category}</div>
              </div>
              <p className="mt-2 text-muted-foreground">{detail.longDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-medium mb-2">Materials</h4>
                <div className="space-y-2">
                  {detail.materials.map((m, i) => (
                    <div key={i} className="flex items-start justify-between border p-3 rounded">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        {m.qty && <div className="text-xs text-muted-foreground">Qty: {m.qty}</div>}
                      </div>
                      {m.estCost && <div className="text-sm font-semibold">{m.estCost}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Estimated scope</h4>
                <div className="text-sm text-muted-foreground mb-3">
                  Cost: <strong>{detail.costRange}</strong><br />
                  ROI: <strong>{detail.roi}</strong><br />
                  Duration: <strong>{detail.duration}</strong>
                </div>

                <h5 className="font-medium mb-1">Work steps</h5>
                <ol className="list-decimal ml-5 text-sm text-muted-foreground space-y-1">
                  {detail.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>

                <div className="mt-6 flex gap-3">
                  <Button onClick={handleRequestQuote} disabled={requesting}>
                    {requesting ? "Requesting…" : "Request Quote"}
                  </Button>
                  <Button variant="ghost" onClick={onClose}>Close</Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-red-600">Enhancement not found.</div>
        )}
      </div>
    </div>
  );
};
