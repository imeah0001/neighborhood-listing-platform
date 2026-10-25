import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import propertySchema from "../../data/schema/property.schema.json";
import generatedData from "../../data/generated/properties-ai-studio.json";
import type { Property } from "../types";

interface PropertyRecord {
  property_id: string;
  title: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  amenities: string[];
  image_url: string;
  image_alt: string;
  listing_url: string;
  local_sponsors: string[];
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
});

addFormats(ajv);

const validateProperty = ajv.compile<PropertyRecord>(propertySchema);

export function getValidatedProperties(): Property[] {
  const listings: unknown = generatedData.listings;

  if (!Array.isArray(listings)) {
    console.error("AI-generated listings must be an array.");
    return [];
  }

  const validProperties: Property[] = [];
  const seenIds = new Set<string>();

  for (const record of listings) {
    if (!validateProperty(record)) {
      console.error("Rejected invalid property:", validateProperty.errors);
      continue;
    }

    if (seenIds.has(record.property_id)) {
      console.error("Rejected duplicate property:", record.property_id);
      continue;
    }

    seenIds.add(record.property_id);

    validProperties.push({
      id: record.property_id,
      title: record.title,
      address: record.street_address,
      city: record.city,
      state: record.state,
      price: record.price,
      bedrooms: record.bedrooms,
      bathrooms: record.bathrooms,
      sqft: record.square_feet,
      propertyType: record.property_type,
      imageUrl: record.image_url.startsWith("https://example.org/")
        ? "/property-placeholder.svg"
        : record.image_url,
      imageAlt: record.image_url.startsWith("https://example.org/")
        ? `Illustrative house graphic; actual photograph unavailable for ${record.title}`
        : record.image_alt,
      listingUrl: record.listing_url,
    });
  }

  return validProperties;
}
