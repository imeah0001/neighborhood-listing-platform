"use client";

import { useState } from "react";
import Image from "next/image";
import type { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const formattedPrice = property.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10] bg-slate-100">
        <Image
          src={property.imageUrl}
          alt={`${property.imageAlt} — ${property.address}, ${property.city}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />

        <button
          type="button"
          onClick={() => setIsSaved((previous) => !previous)}
          aria-pressed={isSaved}
          aria-label={`Save ${property.address} to favorites`}
          className="absolute right-3 top-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-2xl font-bold text-slate-900">
          {formattedPrice}
        </p>

        <h3 className="mt-2 text-lg font-semibold text-slate-900">
          {property.title}
        </h3>

        <address className="mt-1 text-sm not-italic text-slate-600">
          {property.address}, {property.city}, {property.state}
        </address>

        <ul
          aria-label="Property details"
          className="mt-4 flex flex-wrap gap-4 border-t border-slate-200 pt-4 text-sm text-slate-700"
        >
          <li>{property.bedrooms} beds</li>
          <li>{property.bathrooms} baths</li>
          <li>{property.sqft.toLocaleString()} sq ft</li>
          <li>{property.propertyType}</li>
        </ul>

        <a
          href={property.listingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
        >
          View listing for {property.address}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
