// src/components/EnhancementCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  id?: string;
  title: string;
  short?: string;
  cost?: string;
  roi?: string;
  duration?: string;
  category?: string;
  priority?: "high" | "medium" | "low";
  onLearnMore?: (id?: string) => void;
  compact?: boolean;
};

const priorityColor = (p?: string) => {
  switch (p) {
    case "high": return "bg-red-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-400";
  }
};

export const EnhancementCard: React.FC<Props> = ({
  id, title, short, cost, roi, duration, category, priority, onLearnMore, compact
}) => {
  // unified classes: same hover transform & duration for all cards
  const cardBase = [
    "group",
    "border-border/50",
    "bg-card",
    "rounded-md",
    "transform",
    "transition-transform",
    "duration-300",          // slower, pleasant speed
    "hover:shadow-lg",
    "hover:-translate-y-1",  // subtle lift
  ].join(" ");

  return (
    <Card className={cardBase + (compact ? " p-4" : "")}>
      <CardHeader className={compact ? "pb-2" : "pb-4"}>
        <div className="flex items-start justify-between mb-2">
          <Badge className={`${priorityColor(priority)} text-white px-3 py-1 text-xs`}>{priority === "high" ? "High Impact" : priority === "medium" ? "Medium Impact" : priority === "low" ? "Long Term" : "Standard"}</Badge>
          {category && <Badge variant="outline" className="text-xs">{category}</Badge>}
        </div>

        <CardTitle className={`font-semibold ${compact ? "text-base" : "text-xl"} group-hover:text-primary transition-colors`}>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className={compact ? "p-0 pt-2" : "space-y-4"}>
        {short && <p className="text-muted-foreground text-sm leading-relaxed">{short}</p>}

        <div className={`grid grid-cols-2 gap-4 ${compact ? "pt-2" : "pt-4"} border-t border-border/50`}>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Cost</div>
              <div className="font-medium text-sm">{cost}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <div>
              <div className="text-xs text-muted-foreground">ROI</div>
              <div className="font-medium text-sm text-success">{roi}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>

          <Button variant="ghost" size="sm" onClick={() => onLearnMore?.(id)}>
            Learn More <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancementCard;
