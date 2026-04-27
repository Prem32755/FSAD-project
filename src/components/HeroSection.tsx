import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
          Find it. Tour it. Own it.
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 font-medium drop-shadow">
          Discover your perfect home with our premium listings and accurate valuations.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-lg flex items-center max-w-3xl mx-auto">
          <div className="flex-grow pl-4 pr-2">
            <input 
              type="text" 
              placeholder="Enter an address, neighborhood, city, or ZIP code" 
              className="w-full bg-transparent outline-none text-gray-800 text-lg placeholder:text-gray-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-12 flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </form>
      </div>
    </section>
  );
};