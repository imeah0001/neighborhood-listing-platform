"use client";

import { useState } from "react";
import type { FormEvent } from "react";

interface SearchFiltersProps {
  onApplyFilters: (filters: {
    query: string;
    propertyType: string;
  }) => void;
}

export default function SearchFilters({
  onApplyFilters,
}: SearchFiltersProps) {
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onApplyFilters({
      query: query.trim(),
      propertyType,
    });
  }

  return (
    <section aria-labelledby="filters-heading" className="my-8">
      <h2
        id="filters-heading"
        className="mb-4 text-2xl font-bold text-slate-900"
      >
        Search properties
      </h2>

      <form
        role="search"
        aria-label="Property search filters"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3 md:items-end"
      >
        <div>
          <label
            htmlFor="property-location"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Location or address
          </label>

          <input
            id="property-location"
            name="location"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Pacific Palisades"
            className="min-h-11 w-full rounded-lg border border-slate-400 px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
          />
        </div>

        <div>
          <label
            htmlFor="property-type"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Property type
          </label>

          <select
            id="property-type"
            name="propertyType"
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
            className="min-h-11 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
          >
            <option value="all">All property types</option>
            <option value="single-family">Single-family home</option>
            <option value="condo">Condominium</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        <button
          type="submit"
          className="min-h-11 rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
        >
          Apply filters
        </button>
      </form>
    </section>
  );
}
