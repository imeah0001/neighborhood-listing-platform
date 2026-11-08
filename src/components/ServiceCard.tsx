"use client";

export type ServiceListing = {
  id: string;
  title: string;
  hourly_rate: number;
  duration_minutes: number;
  coverage_radius_miles: number;
};

type ServiceCardProps = {
  service: ServiceListing;
  onBook: (service: ServiceListing) => void;
};

export default function ServiceCard({
  service,
  onBook,
}: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header>
        <h3 className="text-xl font-semibold text-slate-900">
          {service.title}
        </h3>
      </header>

      <ul className="mt-4 space-y-2 text-slate-700">
        <li>
          Hourly rate: ${service.hourly_rate.toFixed(2)}
        </li>
        <li>
          Duration: {service.duration_minutes} minutes
        </li>
        <li>
          Coverage radius: {service.coverage_radius_miles} miles
        </li>
      </ul>

      <button
        type="button"
        onClick={() => onBook(service)}
        aria-label={`Book appointment for ${service.title}`}
        className="mt-6 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        Book Now
      </button>
    </article>
  );
}
