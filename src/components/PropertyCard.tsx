export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  imageUrl: string;
  description: string;
}

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="property-card cursor-pointer group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 uppercase tracking-wider shadow-sm">
          {property.propertyType}
        </div>
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {formatPrice(property.price)}
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2 gap-3 divide-x divide-gray-300">
          <div className="pr-3"><span className="font-bold text-gray-900">{property.beds}</span> bds</div>
          <div className="px-3"><span className="font-bold text-gray-900">{property.baths}</span> ba</div>
          <div className="px-3"><span className="font-bold text-gray-900">{property.sqft.toLocaleString()}</span> sqft</div>
        </div>
        <div className="text-gray-500 text-sm truncate">
          {property.location}
        </div>
      </div>
    </div>
  );
};
