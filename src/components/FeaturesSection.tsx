import { TrendingUp, IndianRupee, MapPin, Users, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Value-Based Recommendations',
    description: 'Get suggestions based on actual market data and ROI analysis specific to your location and property type.',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    icon: IndianRupee,
    title: 'Budget-Friendly Solutions',
    description: 'Affordable improvement ideas that fit the Indian middle-class budget without compromising on quality.',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    icon: MapPin,
    title: 'Location-Specific Advice',
    description: 'Recommendations tailored to your city, locality, and local real estate trends for maximum impact.',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    icon: Users,
    title: 'Expert Curation',
    description: 'Content curated by real estate and home improvement experts who understand the Indian market.',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    icon: Shield,
    title: 'Guaranteed ROI',
    description: 'All our recommendations come with projected returns and success stories from real homeowners.',
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Clock,
    title: 'Quick Implementation',
    description: 'Most improvements can be completed within 2-4 weeks with our partner network of contractors.',
    gradient: 'from-teal-500 to-green-600'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient-primary">HomeValue+</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge technology with deep market insights to deliver 
            personalized home enhancement solutions that truly add value.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-card rounded-2xl p-8 shadow-brand-md hover-lift border border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-card-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-primary rounded-3xl p-8 lg:p-12 text-white animate-fade-up">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-white/80">Homes Enhanced</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹2.5L</div>
              <div className="text-white/80">Average Value Added</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-white/80">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-white/80">Partner Contractors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};