import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { RecommendationsSection } from '@/components/RecommendationsSection';
import { EnhancementCategories } from '@/components/EnhancementCategories';
import { ValueCalculator } from '@/components/ValueCalculator';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { PropertyAssessmentForm } from '@/components/PropertyAssessmentForm';
import { AdminLoginModal } from '@/components/AdminLoginModal';
import { PersonalizedResults } from '@/components/PersonalizedResults';
import { ChatbotButton } from '@/components/ChatbotButton';

interface PropertyFormData {
  propertyType: string;
  city: string;
  locality: string;
  propertyAge: number;
  area: number;
  budget: string;
  currentCondition: string;
}

const HomePage: React.FC = () => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyFormData | null>(null);

  const handlePropertySubmit = (data: PropertyFormData) => {
    setPropertyData(data);
    // close form and show results
    setShowPropertyForm(false);
    setShowResults(true);
  };

  const handleGetStarted = () => {
    // If results are open, close them when user re-opens the form
    setShowResults(false);
    setShowPropertyForm(true);
  };

  const handleAdminClick = () => {
    setShowAdminModal(true);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setPropertyData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation onAdminClick={handleAdminClick} />

      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Recommendations Section */}
      <RecommendationsSection />

      {/* Enhancement Categories */}
      <EnhancementCategories />

      {/* Value Calculator */}
      <ValueCalculator />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot */}
      <ChatbotButton />

      {/* Modals */}
      {showPropertyForm && (
        <PropertyAssessmentForm
          onClose={() => setShowPropertyForm(false)}
          onSubmit={handlePropertySubmit}
        />
      )}

      {showAdminModal && (
        <AdminLoginModal onClose={() => setShowAdminModal(false)} />
      )}

      {showResults && propertyData && (
        <PersonalizedResults
          propertyData={propertyData}
          onClose={handleCloseResults}
        />
      )}
    </div>
  );
};

export default HomePage;
