import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Clock, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@homevalueplus.in',
      href: 'mailto:info@homevalueplus.in',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9876543210',
      href: 'tel:+919876543210',
      description: 'Mon-Sat 9:00 AM to 6:00 PM'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Koramangala, Bangalore',
      href: '#',
      description: 'Karnataka, India 560034'
    }
  ];

  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Customers' },
    { icon: Clock, value: '24hrs', label: 'Response Time' },
    { icon: Award, value: '98%', label: 'Success Rate' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-primary text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Information */}
          <div className="animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Get in <span className="text-gradient-accent">Touch</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Ready to transform your home? Our expert team is here to guide you 
              through every step of your property enhancement journey.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <Card 
                    key={index}
                    className="glass border-white/20 hover-lift"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{contact.title}</h4>
                          <a 
                            href={contact.href}
                            className="text-white/90 hover:text-accent transition-colors block"
                          >
                            {contact.value}
                          </a>
                          <p className="text-white/70 text-sm">{contact.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Card className="glass border-white/20 shadow-brand-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/90">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-accent focus:ring-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-accent focus:ring-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/90">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your property and what you'd like to improve..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-accent focus:ring-accent resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};