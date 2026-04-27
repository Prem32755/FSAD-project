import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  IndianRupee,
  Clock,
  MapPin,
  Home,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface PropertyFormData {
  propertyType: string;
  city: string;
  locality: string;
  propertyAge: number;
  area: number;
  budget: string;
  currentCondition: string;
}

interface PersonalizedResultsProps {
  propertyData: PropertyFormData;
  onClose: () => void;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  cost: string;
  roi: string;
  timeframe: string;
  priority: 'high' | 'medium' | 'low';
  reasons: string[];
  contractors?: number;
}

const generateRecommendations = (data: PropertyFormData): Recommendation[] => {
  const budget = parseInt(data.budget, 10);
  const isOldProperty = data.propertyAge > 15;
  const isLargeProperty = data.area > 1000;
  const needsRenovation = data.currentCondition === 'needs-renovation';
  const recommendations: Recommendation[] = [];

  if (budget >= 50000 && needsRenovation) {
    recommendations.push({
      id: '1',
      title: 'Fresh Interior Paint & Lighting',
      description: 'Complete interior painting with modern colors and LED lighting upgrades for an immediate visual lift.',
      cost: 'Rs. 25,000 - Rs. 45,000',
      roi: '+18% Value',
      timeframe: '4-6 days',
      priority: 'high',
      reasons: ['Property needs renovation', 'High ROI for this budget', 'Quick completion'],
      contractors: 12
    });
  }

  if (budget >= 100000) {
    recommendations.push({
      id: '2',
      title: 'Modular Kitchen Upgrade',
      description: 'Install space-efficient cabinets and improved storage to make the kitchen more attractive for buyers.',
      cost: 'Rs. 80,000 - Rs. 1,20,000',
      roi: '+25% Value',
      timeframe: '7-10 days',
      priority: 'medium',
      reasons: [`Popular with buyers in ${data.city}`, 'High functional value', 'Strong resale appeal'],
      contractors: 8
    });
  }

  if (budget >= 200000 && isLargeProperty) {
    recommendations.push({
      id: '3',
      title: 'Smart Home and Security Setup',
      description: 'Add smart switches, security sensors, and modern lighting controls for a more premium feel.',
      cost: 'Rs. 1,50,000 - Rs. 2,50,000',
      roi: '+30% Value',
      timeframe: '3-5 days',
      priority: 'medium',
      reasons: ['Large property footprint', 'Modern family demand', 'Future-ready investment'],
      contractors: 5
    });
  }

  if (isOldProperty) {
    recommendations.push({
      id: '4',
      title: 'Electrical and Plumbing Upgrade',
      description: 'Replace aging lines and fixtures to improve safety, reliability, and buyer confidence.',
      cost: 'Rs. 60,000 - Rs. 1,00,000',
      roi: '+20% Value',
      timeframe: '5-8 days',
      priority: 'high',
      reasons: [`Property age is ${data.propertyAge} years`, 'Safety compliance', 'Essential maintenance'],
      contractors: 15
    });
  }

  recommendations.push({
    id: '5',
    title: 'Balcony and Exterior Refresh',
    description: 'Use plants, lighting, and seating to make the home feel more inviting on a modest budget.',
    cost: 'Rs. 8,000 - Rs. 20,000',
    roi: '+12% Value',
    timeframe: '2-3 days',
    priority: 'high',
    reasons: ['Budget-friendly', 'High visual impact', 'Useful for apartments and resale'],
    contractors: 20
  });

  if (budget >= 300000) {
    recommendations.push({
      id: '6',
      title: 'Solar Panel Installation',
      description: 'Reduce running costs and add long-term value with rooftop solar for suitable homes.',
      cost: 'Rs. 2,50,000 - Rs. 4,00,000',
      roi: '+35% Value',
      timeframe: '2-3 days',
      priority: 'low',
      reasons: ['Long-term savings', 'Government incentive potential', 'Sustainability appeal'],
      contractors: 3
    });
  }

  return recommendations.slice(0, 4);
};

export const PersonalizedResults = ({ propertyData, onClose }: PersonalizedResultsProps) => {
  const recommendations = generateRecommendations(propertyData);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Long Term';
      default: return 'Standard';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 shadow-brand-xl animate-fade-up">
            <CardHeader className="bg-gradient-primary text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">Your Personalized Recommendations</CardTitle>
                  <p className="text-white/90">
                    Based on your {propertyData.propertyType} in {propertyData.locality}, {propertyData.city}
                  </p>
                </div>
                <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
                  X
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Home className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-medium">{propertyData.propertyType}</div>
                    <div className="text-sm text-muted-foreground">{propertyData.area} sq ft</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-medium">{propertyData.city}</div>
                    <div className="text-sm text-muted-foreground">{propertyData.locality}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-medium">{propertyData.propertyAge} years old</div>
                    <div className="text-sm text-muted-foreground capitalize">{propertyData.currentCondition.replace('-', ' ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <IndianRupee className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-medium">Rs. {parseInt(propertyData.budget, 10).toLocaleString('en-IN')}</div>
                    <div className="text-sm text-muted-foreground">Budget</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {recommendations.map((rec, index) => (
              <Card
                key={rec.id}
                className="hover-lift shadow-brand-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${getPriorityColor(rec.priority)} text-white px-3 py-1`}>
                      {getPriorityText(rec.priority)}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {rec.contractors}+ contractors available
                    </div>
                  </div>
                  <CardTitle className="text-xl">{rec.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{rec.description}</p>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/50">
                    <div className="text-center">
                      <IndianRupee className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="text-sm font-medium">{rec.cost}</div>
                      <div className="text-xs text-muted-foreground">Investment</div>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 text-success" />
                      <div className="text-sm font-medium text-success">{rec.roi}</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-accent" />
                      <div className="text-sm font-medium">{rec.timeframe}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Why this is recommended:</h4>
                    <ul className="space-y-1">
                      {rec.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full btn-hero group">
                    Get Contractor Quotes
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4 animate-fade-up">
            <Button onClick={onClose} className="btn-hero px-8">
              Start Another Assessment
            </Button>
            <p className="text-muted-foreground">
              Need more personalized advice? Contact our experts for a detailed consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
