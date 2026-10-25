"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import SponsorBanner from "./SponsorBanner";
import SearchFilters from "./SearchFilters";
import { sampleSponsor } from "../app/sample-data";
import type { Property } from "../types";

interface Filters {
  query: string;
  propertyType: string;
}

export default function PropertyExplorer({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    propertyType: "all",
  });

  const visibleProperties = properties.filter((property) => {
    const searchText = [
      property.title,
      property.address,
      property.city,
      property.state,
    ]
      .join(" ")
      .toLowerCase();

    const matchesLocation = searchText.includes(
      filters.query.toLowerCase()
    );

    const matchesType =
      filters.propertyType === "all" ||
      property.propertyType === filters.propertyType;

    return matchesLocation && matchesType;
  });

  return (
    <>
      <SearchFilters onApplyFilters={setFilters} />

      <SponsorBanner sponsor={sampleSponsor} />

      <section aria-labelledby="listings-heading">
        <h2
          id="listings-heading"
          className="mb-2 text-2xl font-bold text-slate-900"
        >
          Available properties
        </h2>

        <p
          role="status"
          aria-live="polite"
          className="mb-5 text-sm text-slate-600"
        >
          Showing {visibleProperties.length} sample {visibleProperties.length === 1 ? "property" : "properties"}
        </p>

        {visibleProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
            No properties match your filters. Try another search.
          </p>
        )}
      </section>
    </>
  );
}
