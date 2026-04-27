import { useState, useEffect } from 'react';
import { Property } from '@/components/PropertyCard';
import { fallbackProperties } from '@/lib/demoData';

export const useProperties = (searchQuery: string = '') => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
        const url = searchQuery 
          ? `${baseUrl}/properties?search=${encodeURIComponent(searchQuery)}`
          : `${baseUrl}/properties`;
          
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error('Failed to fetch properties');
        }
        
        const data = await res.json();
        setProperties(data);
      } catch (err: any) {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        const filtered = normalizedQuery
          ? fallbackProperties.filter((property) =>
              [property.title, property.location, property.propertyType, property.description]
                .some((value) => value.toLowerCase().includes(normalizedQuery)),
            )
          : fallbackProperties;

        setProperties(filtered);
        setError(err.message || 'Showing built-in sample listings because the live property service is unavailable.');
      } finally {
        setIsLoading(false);
      }
    };

    // adding a slight delay for search debouncing effect
    const delayDebounceFn = setTimeout(() => {
      fetchProperties();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return { properties, isLoading, error };
};
