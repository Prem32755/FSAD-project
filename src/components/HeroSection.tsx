import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+CjwvZz4KPC9nPgo8L3N2Zz4=')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Home,{' '}
              <span className="text-gradient-accent">Increase</span> Its Value
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Get personalized, data-driven recommendations to enhance your property's value 
              with affordable solutions tailored for Indian middle-class homes.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="btn-hero group"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg"
                variant="ghost"
                onClick={scrollToFeatures}
                className="btn-glass group"
              >
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-white/70">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm">Homes Enhanced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">₹2L+</div>
                <div className="text-sm">Avg. Value Added</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm">Customer Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Modern Indian Home Enhancement"
                className="rounded-2xl shadow-brand-xl hover-glow transition-all duration-500 w-full h-auto"
              />
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white/20 glass rounded-xl p-4 animate-float hidden lg:block">
                <div className="text-white text-sm font-medium">+25% Value Increase</div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent/90 rounded-xl p-4 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
                <div className="text-white text-sm font-medium">Budget-Friendly</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};