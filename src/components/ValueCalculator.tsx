import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, IndianRupee, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CalculationResult {
  estimatedIncrease: number;
  newValue: number;
  roiPercentage: number;
  recommendations: string[];
}

export const ValueCalculator = () => {
  const { toast } = useToast();
  const [baseValue, setBaseValue] = useState<string>('');
  const [improvementSpend, setImprovementSpend] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateValue = () => {
    if (!baseValue || !improvementSpend) {
      toast({
        title: "Missing Information",
        description: "Please enter both property value and improvement budget.",
        variant: "destructive"
      });
      return;
    }

    const base = parseFloat(baseValue);
    const spend = parseFloat(improvementSpend);

    if (base <= 0 || spend <= 0) {
      toast({
        title: "Invalid Values",
        description: "Please enter valid positive numbers.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);

    // Simulate calculation
    setTimeout(() => {
      // Simple ROI calculation with different multipliers based on spend amount
      let multiplier = 1.2; // Base 20% return
      if (spend < 50000) multiplier = 1.15; // 15% for small improvements
      else if (spend > 200000) multiplier = 1.25; // 25% for larger improvements

      const estimatedIncrease = spend * multiplier;
      const newValue = base + estimatedIncrease;
      const roiPercentage = ((estimatedIncrease - spend) / spend) * 100;

      const recommendations = [];
      if (spend < 50000) {
        recommendations.push('Fresh paint and lighting upgrades');
        recommendations.push('Balcony garden and minor repairs');
      } else if (spend < 200000) {
        recommendations.push('Modular kitchen upgrade');
        recommendations.push('Bathroom renovation with modern fixtures');
      } else {
        recommendations.push('Complete interior renovation');
        recommendations.push('Solar panel installation');
        recommendations.push('Smart home automation');
      }

      setResult({
        estimatedIncrease,
        newValue,
        roiPercentage,
        recommendations
      });

      setIsCalculating(false);

      toast({
        title: "Calculation Complete!",
        description: "Your property value estimate has been generated.",
      });
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Property Value <span className="text-gradient-primary">Estimator</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get an instant estimate of how much your property improvements could increase your home's value.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="shadow-brand-lg animate-scale-in">
              <CardHeader className="bg-gradient-primary text-white">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Calculator className="w-6 h-6" />
                  Value Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="baseValue" className="text-sm font-medium">
                    Current Property Value (₹)
                  </Label>
                  <Input
                    id="baseValue"
                    type="number"
                    placeholder="e.g., 5000000"
                    value={baseValue}
                    onChange={(e) => setBaseValue(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your property's current market value
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="improvementSpend" className="text-sm font-medium">
                    Improvement Budget (₹)
                  </Label>
                  <Input
                    id="improvementSpend"
                    type="number"
                    placeholder="e.g., 200000"
                    value={improvementSpend}
                    onChange={(e) => setImprovementSpend(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    How much do you plan to spend on improvements?
                  </p>
                </div>

                <Button 
                  onClick={calculateValue}
                  disabled={isCalculating}
                  className="w-full btn-hero text-lg py-3"
                >
                  {isCalculating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate Estimate
                      <TrendingUp className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="shadow-brand-lg animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Estimation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {result ? (
                  <div className="space-y-6">
                    {/* Value Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-success/10 rounded-lg p-4 text-center">
                        <IndianRupee className="w-6 h-6 text-success mx-auto mb-2" />
                        <div className="text-2xl font-bold text-success">
                          {formatCurrency(result.estimatedIncrease)}
                        </div>
                        <div className="text-sm text-muted-foreground">Estimated Increase</div>
                      </div>
                      
                      <div className="bg-primary/10 rounded-lg p-4 text-center">
                        <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-primary">
                          {result.roiPercentage.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">ROI</div>
                      </div>
                    </div>

                    {/* New Property Value */}
                    <div className="bg-gradient-card rounded-xl p-6 text-center">
                      <h4 className="text-lg font-semibold mb-2">New Property Value</h4>
                      <div className="text-4xl font-bold text-gradient-primary">
                        {formatCurrency(result.newValue)}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-accent" />
                        Recommended Improvements
                      </h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-accent rounded-full" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter your property details above to see the estimated value increase.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};