import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PropertyGrid } from '@/components/PropertyGrid';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { ChatbotButton } from '@/components/ChatbotButton';
import { PropertyAssessmentForm } from '@/components/PropertyAssessmentForm';
import { PersonalizedResults } from '@/components/PersonalizedResults';
import { RecommendationsSection } from '@/components/RecommendationsSection';
import { UserRequestSection } from '@/components/UserRequestSection';

const HomePage: React.FC = () => {
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection onSearch={handleSearch} />

      <section id="listings" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center md:text-left">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Middle-Class Property Listings</h2>
                <p className="text-gray-600 max-w-2xl">
                  Browse residential properties and identify practical upgrades that can improve resale value or rental appeal.
                  {searchQuery && (
                    <span className="font-semibold block mt-2 text-primary">
                      Results for: "{searchQuery}"
                    </span>
                  )}
                </p>
              </div>
              <button onClick={() => setShowAssessmentForm(true)} className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90">
                Get Personalized Ideas
              </button>
            </div>
          </div>

          <PropertyGrid searchQuery={searchQuery} />
        </div>
      </section>

      <RecommendationsSection />
      <UserRequestSection />
      <FeaturesSection />
      <Footer />
      <ChatbotButton />

      {showAssessmentForm && (
        <PropertyAssessmentForm
          onClose={() => setShowAssessmentForm(false)}
          onSubmit={(data) => {
            setAssessmentResult(data);
            setShowAssessmentForm(false);
          }}
        />
      )}
      {assessmentResult && <PersonalizedResults propertyData={assessmentResult} onClose={() => setAssessmentResult(null)} />}
    </div>
  );
};

export default HomePage;
