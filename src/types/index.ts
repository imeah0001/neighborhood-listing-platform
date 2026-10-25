export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  imageUrl: string;
  imageAlt: string;
  listingUrl: string;
}

export interface Sponsor {
  id: string;
  name: string;
  headline: string;
  imageUrl: string;
  websiteUrl: string;
  altText: string;
}
