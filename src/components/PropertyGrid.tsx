import { PropertyCard } from './PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Loader2 } from 'lucide-react';

interface PropertyGridProps {
  searchQuery: string;
}

export const PropertyGrid = ({ searchQuery }: PropertyGridProps) => {
  const { properties, isLoading, error } = useProperties(searchQuery);

  if (isLoading) {
    return (
      <div className="w-full flex-col h-64 flex items-center justify-center text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p>Loading properties...</p>
      </div>
    );
  }

  if (error && properties.length === 0) {
    return (
      <div className="w-full p-8 bg-red-50 border border-red-200 rounded-lg text-center text-red-600">
        <p className="font-semibold text-lg mb-2">Oops!</p>
        <p>{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="w-full p-12 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500">
        <p className="text-xl font-medium mb-2">No properties found</p>
        <p>Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
