import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Home,
  ArrowUp
} from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+CjwvZz4KPC9nPgo8L3N2Zz4=')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with <span className="text-gradient-accent">Home Enhancement</span> Tips
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get the latest trends, expert advice, and exclusive offers delivered to your inbox. 
              Join 10,000+ homeowners who trust HomeValue+ for property enhancement insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-accent"
              />
              <Button className="bg-accent hover:bg-accent/90 text-white px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient-primary">HomeValue+</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering Indian homeowners to make smart property improvements 
                that add real value through data-driven recommendations and expert guidance.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Features', id: 'features' },
                  { label: 'Recommendations', id: 'recommendations' },
                  { label: 'Categories', id: 'categories' },
                  { label: 'Calculator', id: 'calculator' },
                  { label: 'Contact', id: 'contact' }
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Property Assessment</li>
                <li>Value Enhancement Planning</li>
                <li>Contractor Network</li>
                <li>ROI Analysis</li>
                <li>Expert Consultation</li>
                <li>Market Research</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:info@homevalueplus.in"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      info@homevalueplus.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href="tel:+919876543210"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      +91 9876543210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-400">
                      KLU, Vijayawada<br />
                     Andhra Pradesh , India 522302
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-center md:text-left">
            © {currentYear} HomeValue+. All rights reserved. Made with ❤️ for Indian homeowners.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};