import type { Property } from "@/components/PropertyCard";

export const fallbackProperties: Property[] = [
  {
    id: 1,
    title: "2 BHK Apartment with Balcony Potential",
    location: "Whitefield, Bengaluru",
    price: 7200000,
    beds: 2,
    baths: 2,
    sqft: 1120,
    propertyType: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80",
    description: "A practical middle-class apartment with scope for modular kitchen upgrades, fresh paint, and balcony utility improvements.",
  },
  {
    id: 2,
    title: "Compact Family Flat Near Metro",
    location: "Dwarka, New Delhi",
    price: 6800000,
    beds: 3,
    baths: 2,
    sqft: 1250,
    propertyType: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
    description: "Well-connected flat suited for value-enhancing updates like wardrobe storage, bathroom renovation, and energy-efficient lighting.",
  },
  {
    id: 3,
    title: "Independent House for Smart Renovation",
    location: "Madhapur, Hyderabad",
    price: 9800000,
    beds: 3,
    baths: 3,
    sqft: 1650,
    propertyType: "Independent House",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
    description: "An older independent home with strong resale upside through exterior work, plumbing refresh, and solar installation.",
  },
  {
    id: 4,
    title: "Budget-Friendly Resale Home",
    location: "Thoraipakkam, Chennai",
    price: 5900000,
    beds: 2,
    baths: 2,
    sqft: 980,
    propertyType: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80",
    description: "A resale property ideal for low-cost upgrades that improve comfort, presentation, and rental appeal.",
  },
];

export const fallbackStats = {
  totalUsers: 2,
  totalAssessments: fallbackProperties.length,
  avgValueIncrease: "Rs. 2,45,000",
  activeRecommendations: 6,
};
